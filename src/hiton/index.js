const replaceTable = require("./modules/table");
const { COMMENT_REGX, BLANK } = require("./../lib/constants");

const H6_REGX = /###### (.*?)(\n|$)/g,
	H5_REGX = /##### (.*?)(\n|$)/g,
	H4_REGX = /#### (.*?)(\n|$)/g,
	H3_REGX = /### (.*?)(\n|$)/g,
	H2_REGX = /## (.*?)(\n|$)/g,
	H1_REGX = /# (.*?)(\n|$)/g;

const H6_STR = "<h1 class=\"h6\">$1</h1>",
	H5_STR = "<h1 class=\"h5\">$1</h1>",
	H4_STR = "<h1 class=\"h4\">$1</h1>",
	H3_STR = "<h1 class=\"h3\">$1</h1>",
	H2_STR = "<h1 class=\"h2\">$1</h1>",
	H1_STR = "<h1 class=\"h1\">$1</h1>";

const HitOn = module.exports = require("./base").create((input) => {

	input = input.replace(COMMENT_REGX, BLANK); // 去掉注释

	let link = replaceSrcLinks(); // 外部连接
	let align = replaceAlign(); // 对齐
	let escape = replaceEscapers(); // 转义字符

	input = link.before(input);
	input = escape.before(input);
	input = align.before(input);

	input = commonReplace(input); // 调用公共替换

	input = replaceQuote(input); // 引用
	input = replaceList(input); // 列表
	input = replaceTable(input); // 表格

	input = replaceReference(input); // 参考链接

	input = input.replace(H6_REGX, H6_STR); // 六级标题
	input = input.replace(H5_REGX, H5_STR); // 五级标题
	input = input.replace(H4_REGX, H4_STR); // 四级标题
	input = input.replace(H3_REGX, H3_STR); // 三级标题
	input = input.replace(H2_REGX, H2_STR); // 二级标题
	input = input.replace(H1_REGX, H1_STR); // 一级标题

	input = align.after(input);
	input = escape.after(input);
	input = link.after(input);

	input = replaceP(input); // 段落

	return input;
}, {
	object: [
		// 引用
		{
			regexp: /\[\[((.|\s)*?)\]\]/,
			tag: {
				start: "[[",
				end: "]]",
				html: "pre",
				attrs: {
					"class": "pre"
				}
			}
		},
		// 注音
		{
			regexp: /{{((.|\s)*?)}}/,
			tag: {
				start: "{{",
				end: "}}",
				html: "ruby"
			},
			replace: [
				{
					from: /\(/g,
					to: "<rp>(</rp><rt>"
				},
				{
					from: /\)/g,
					to: "</rt><rp>)</rp>"
				}
			]
		}
	],
	aspect: {
		simpleLineCode: {
			regexp: /`([^`]+?)`/,
			tag: {
				start: "`",
				end: "`"
			}
		},
		escapeSequence: /\\(\S)/
	}
});