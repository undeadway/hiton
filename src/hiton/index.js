const { COMMENT_REGX, BLANK } = require("./../lib/constants");
const { Char: { Space }, HTML: { Tag } } = JsConst;

const NL_REGX = /  \n/g,
		N_REGX = /\n/g;
const BR_TAG = "<br />";
const LF = Space.LF;
const TWO_LF = `${LF}${LF}`;

const replaceSrcLinks = require("./modules/src-links");
const replaceImages = require("./modules/image");
const replaceAlign = require("./modules/align");
const replaceEscapers = require("./modules/escaper");
const replaceQuote = require("./modules/quote");
const replaceList = require("./modules/list");
const replaceTable = require("./modules/table");
const replaceReference = require("./modules/reference");

const basicReplace = require("./modules/basic");

const hitOn = module.exports = require("./base").create((input) => {

	try {
		input = input.replace(/\r\n/g, LF);
		input = input.replace(COMMENT_REGX, BLANK); // 去掉注释

		const output = [];
		Array.forEach(input.split(TWO_LF), (index, string) => {

			string = LF + string + LF;

			let link = replaceSrcLinks(); // 外部连接（链接、邮箱）
			// let image = replaceImages(); // 图像（图像、图像引用）
			let align = replaceAlign(); // 对齐
			// let escape = replaceEscapers(); // 转义字符
	
			// string = image.before(string);
			string = link.before(string);
			string = align.before(string);
			// string = escape.before(string);
	
			string = basicReplace(string); // 调用公共替换
	
			string = replaceQuote(string); // 引用
			// string = replaceList(string); // 列表
			string = replaceTable(hitOn, string); // 表格（表格、表格引用）
	
			// string = replaceReference(string); // 参考链接
	
			string = align.after(string);
			// string = image.after(string);
			// string = escape.after(string);
			string = link.after(string);

			string = string.replace(NL_REGX, BR_TAG); // 单行换行
			string = string.replace(N_REGX, Space.SPACE);// \n => 一个空白


			output.push(string);
		});
		
		input =  input = "<p>" + output.join("</p><p>") + "</p>";
	// input = replaceP(input); // 段落
	} catch(err) {
		console.log(err);
	}

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