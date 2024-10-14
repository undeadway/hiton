require("coralian");
const { aspectBase, getMappingCount } = require("./lib/utils");

const { Char: { Space: { LF } } } = JsConst;

const NL_REGX = /  \n/g,
		NEW_LINE_REGX = /(\r\n|\r)/g,
		COMMENT_REGX = /\/\*((.|\s)*?)\*\//g;
const BR_TAG = "<br />";
const TWO_LF = `${LF}${LF}`;

const replaceSrcLinks = require("./modules/src-links");
const replaceImages = require("./modules/image");
const replaceAlign = require("./modules/align");
const replaceQuote = require("./modules/quote");
const replaceList = require("./modules/list");
const replaceHeading = require("./modules/heading");
const replaceTable = require("./modules/table");
const replaceRefValue = require("./modules/ref-value");
const replaceInlineCode = require("./modules/inline-code");
const reaplceEscapes = require("./modules/esacpes");
const replaceInline = require("./modules/inline");
const replavePreStruct = require("./modules/pre-struct");

function parser (input, options = {}) {
	try {
		input = input.replace(NEW_LINE_REGX, LF);
		input = input.replace(COMMENT_REGX, String.BLANK); // 去掉注释

		// 因为复杂结构可能含有 `__` 等字符，所以全部由 aspcet 形式来实现
		const _replaceHeading = replaceHeading(options);
		const _replaceSrcLinks = replaceSrcLinks(); // 外部连接（链接、邮箱）
		const _replaceImages = replaceImages(options); // 图片（图片、图片引用）
		const _replaceTable = replaceTable(options); // 表格（表格、表格定义、表格引用）
		const _replaceQuote = replaceQuote(); // 引用
		const _replaceList = replaceList(); // 列表
		const _replaceAlign = replaceAlign(); // 对齐
		const _replaceRefValue = replaceRefValue(); // 参考（值）
		const _replaceInlineCode = replaceInlineCode(); // 行内代码
		const _reaplceEscapes = reaplceEscapes(); // 转义字符
		const _replavePreStruct = replavePreStruct(); // 预定义结构

		const output = [];
		Array.forEach(input.split(TWO_LF), (index, string) => {

			string = LF + string + LF;

			string = _reaplceEscapes.before(string);
			string = _replaceInlineCode.before(string);
			string = _replaceImages.before(string);
			string = _replaceAlign.before(string);
			string = _replaceSrcLinks.before(string);
			string = _replaceTable.before(string);
			string = _replaceHeading.before(string);
			string = _replaceList.before(string);
			string = _replaceRefValue.before(string);
			string = _replavePreStruct.before(string);
			string = _replaceQuote.before(string);

			string = replaceInline(string); // 行内设置

			string = _replaceQuote.after(string);
			string = _replavePreStruct.after(string);
			string = _replaceRefValue.after(string);
			string = _replaceList.after(string);
			string = _replaceHeading.after(string);
			string = _replaceTable.after(string);
			string = _replaceSrcLinks.after(string);
			string = _replaceAlign.after(string);
			string = _replaceImages.after(string);
			string = _replaceInlineCode.after(string);
			string = _reaplceEscapes.after(string);

			string = string.replace(NL_REGX, BR_TAG); // 单行换行

			output.push(string);
		});

		input =  input = "<p>" + output.join("</p><p>") + "</p>";
	} catch(err) {
		console.log(err);
	}

	return `<div class="hiton">${input}</div>`;
}

module.exports = exports = {
	create: (options, aspects = []) => {

		function replaceURI(str) {

			try {
				return decodeURIComponent(str);// 最后的转义出处理
			} catch (e) {
				// 如果出错，就当不存在，直接输出原始内容
				return str;
			}
		}
	
		return {
			parse: (str) => {
				Array.forEach(aspects, (index, aspect) => { // 定制插片前处理
					str = aspect.before(str);
				});

				str = parser(str, options);

				// 插片后处理
				Array.forEach(aspects, (index, aspcet) => {
					str = aspcet.after(str);
				});

				return replaceURI(str);
			}
		};
	},
	createAspect : (name, before) => {
		const aspcet = aspectBase(name);
		aspcet.before = before;
		return aspcet;
	},
	getMappingCount (name) {
		return getMappingCount(name);
	}
};
