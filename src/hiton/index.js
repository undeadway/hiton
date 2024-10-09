const { COMMENT_REGX, BLANK } = require("./../lib/constants");
const { HTML: { Tag } } = JsConst;

const replaceSrcLinks = require("./modules/src-links");
const replaceImages = require("./modules/image");
const replaceAlign = require("./modules/align");
const replaceEscapers = require("./modules/escaper");
const replaceQuote = require("./modules/quote");
const replaceList = require("./modules/list");
const replaceTable = require("./modules/table");
const replaceReference = require("./modules/reference");

const basicReplace = require("./modules/basic");

module.exports = require("./base").create((input) => {

	input = input.replace(COMMENT_REGX, BLANK); // 去掉注释

	let link = replaceSrcLinks(); // 外部连接（链接、邮箱）
	let image = replaceImages(); // 图像（图像、图像引用）
	let align = replaceAlign(); // 对齐
	let escape = replaceEscapers(); // 转义字符

	input = image.before(input);
	input = link.before(input);
	input = align.before(input);
	input = escape.before(input);

	input = basicReplace(input); // 调用公共替换

	input = replaceQuote(input); // 引用
	input = replaceList(input); // 列表
	input = replaceTable(input); // 表格（表格、表格引用）

	input = replaceReference(input); // 参考链接

	input = align.after(input);
	input = image.after(input);
	input = escape.after(input);
	input = link.after(input);

	input = replaceP(input); // 段落

	return input;
}, {
	object: [
		// 预定义结构
		{
			regexp: /\[\[((.|\s)*?)\]\]/,
			tag: {
				start: "[[",
				end: "]]",
				html: Tag.PRE,
				attrs: {
					"class": "pre"
				}
			}
		}
	],
	aspect: {
		// 行内代码
		simpleLineCode: {
			regexp: /`([^`]+?)`/,
			tag: {
				start: "`",
				end: "`"
			},
			html: Tag.CODE
		}
	}
});