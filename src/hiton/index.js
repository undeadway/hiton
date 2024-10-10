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
const replaceQuote = require("./modules/quote");
const replaceList = require("./modules/list");
const replaceHeading = require("./modules/heading");
const replaceTable = require("./modules/table");
const replaceReference = require("./modules/reference");

const replaceInline = require("./modules/inline");

module.exports = exports = require("./base").create((input, options) => {

	try {
		input = input.replace(/\r\n/g, LF);
		input = input.replace(COMMENT_REGX, BLANK); // 去掉注释

		// 因为复杂结构可能含有 `__` 等字符，所以全部由 aspcet 形式来实现
		const _replaceHeading = replaceHeading(options);
		const _replaceSrcLinks = replaceSrcLinks(); // 外部连接（链接、邮箱）
		const _replaceImages = replaceImages(options); // 图片（图片、图片引用）
		const _replaceTable = replaceTable(); // 表格（表格、表格定义、表格引用）
		const _replaceQuote = replaceQuote(); // 引用
		const _replaceList = replaceList(); // 列表
		const _replaceAlign = replaceAlign(); // 对齐

		const output = [];
		Array.forEach(input.split(TWO_LF), (index, string) => {

			string = LF + string + LF;

			string = _replaceImages.before(string);
			string = _replaceSrcLinks.before(string);
			string = _replaceTable.before(string);
			string = _replaceHeading.before(string);
			string = _replaceList.before(string);
			string = _replaceAlign.before(string);
			string = _replaceQuote.before(string);

			string = replaceInline(string); // 行内设置

			string = _replaceQuote.after(string);
			string = _replaceAlign.after(string);
			string = _replaceList.after(string);
			string = _replaceHeading.after(string);
			string = _replaceTable.after(string);
			string = _replaceSrcLinks.after(string);
			string = _replaceImages.after(string);
	
			// string = replaceReference(string); // TODO 参考链接

			string = string.replace(NL_REGX, BR_TAG); // 单行换行
			string = string.replace(N_REGX, String.BLANK);// \n => 一个空白

			output.push(string);
		});
		
		input =  input = "<p>" + output.join("</p><p>") + "</p>";
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
