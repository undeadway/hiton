const { COMMENT_REGX, BLANK } = require(".//lib/constants");
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
const replaceRefValue = require("./modules/ref-value");
const replaceInlineCode = require("./modules/inline-code");
const reaplceEscapes = require("./modules/esacpes");

const replaceInline = require("./modules/inline");

function create (parser) {
	return {
		create: () => {

			function replaceURI(str) {

				try {
					return decodeURIComponent(str);// 最后的转义出处理
				} catch (e) {
					// 如果出错，就当不存在，直接输出原始内容
					return str;
				}
			}
		
			return {
				parse: (str, options, plugIns = []) => {

					Array.forEach(plugIns, (index, aspect) => { // 定制插片前处理
						str = aspect.before(str);
						aspects.push(aspect);
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
		}
	}
};


module.exports = exports = create((input, options) => {
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
		const _replaceRefValue = replaceRefValue(); // 参考（值）
		const _replaceInlineCode = replaceInlineCode(); // 行内代码
		const _reaplceEscapes = reaplceEscapes(); // 转义字符

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
			string = _replaceQuote.before(string);

			string = replaceInline(string); // 行内设置

			string = _replaceQuote.after(string);
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
			string = string.replace(N_REGX, String.BLANK);// \n => 一个空白

			output.push(string);
		});

		input =  input = "<p>" + output.join("</p><p>") + "</p>";
	} catch(err) {
		console.log(err);
	}

	return input;
});
