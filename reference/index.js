
const { aspectBase, parseEqualToObject, compireH5Video, compireH5Audio } = require("./../util");
const MAIN_QUOT_REGX = /\n(\n(>(.*)\n)+)/,
	NL_RT_ANGLE_GLOBAL_REGX = /\n>/g;
const STRING_QUOTE = "引用";

const { Char: { Parenthe, Space } } = JsConst;
const VERTICAL_LINE = "|";

function replaceQuote(input) {

	while (MAIN_QUOT_REGX.test(input)) { // 获取>列表行，从 \n> 开始 到 >\n 结束，中间每行都以 > 开头 \n 结束
		let protoQuotTxt = RegExp.$1;
		let quotTxt = protoQuotTxt.replace(NL_RT_ANGLE_GLOBAL_REGX, Space.LF); // 去掉每行开头的 >(&gt;)
		quotTxt = quotTxt.slice(1); // 去掉第一行的换行符
		let indexNL = quotTxt.indexOf(Space.LF);

		let quotTtlLn = quotTxt.slice(0, indexNL);
		let hasQuotTtl = String.startsWith(quotTtlLn, Parenthe.LEFT) && String.endsWith(quotTtlLn, Parenthe.RIGHT);

		let legend = hasQuotTtl ? quotTtlLn.slice(1, quotTtlLn.length - 1) : STRING_QUOTE;
		let outTxt = hasQuotTtl ? quotTxt.slice(indexNL + 1) : quotTxt;

		outTxt = replaceQuote(outTxt); // 递归查找看是否有多重引用

		input = input.replace(MAIN_QUOT_REGX, `<fieldset><legend>${legend}</legend>${outTxt}</fieldset>`);
	}

	return input;
}

const replaceList = (function () {

	const UL_REGEX = /(\*+\. (.)+\n)+/,
		OL_1_REGEX = /([0-9]+\. (.)+\n)+/,
		OL_A_REGEX = /([a-z]+\. (.)+\n)+/,
		TYPE_1_LI_START = /[0-9]+\. /g,
		TYPE_A_LI_START = /[a-z]+\. /g,
		UL_LI_START = /\*+\. /g,
		LI_END = /\n/g;

	const LI_START_TAG = "<li>",
		LI_END_TAG = "</li>",
		UL_START_TAG = "<ul>",
		UL_END_TAG = "</ul>",
		OL_START_TYPE_1_TAG = `<ol class="list_type_1">`,
		OL_START_TYPE_A_TAG = `<ol class="list_type_a">`,
		OL_END_TAG = "</ol>";

	function replace(input, part, liStart, startTag, endTag) {

		var output = part.replace(liStart, LI_START_TAG);
		output = output.replace(LI_END, LI_END_TAG);

		return input.replace(part, startTag + output + endTag);
	}

	return function (input) {

		// ul
		while ((matches = input.match(UL_REGEX)) !== null) {
			input = replace(input, matches[0], UL_LI_START, UL_START_TAG, UL_END_TAG);
		}
		// ol -1
		while ((matches = input.match(OL_1_REGEX)) !== null) {
			input = replace(input, matches[0], TYPE_1_LI_START, OL_START_TYPE_1_TAG, OL_END_TAG);
		}
		// ol -a
		while ((matches = input.match(OL_A_REGEX)) !== null) {
			input = replace(input, matches[0], TYPE_A_LI_START, OL_START_TYPE_A_TAG, OL_END_TAG);
		}

		return input;
	};
})();

const COLOR_TAG_REGX = /\[#([0-9,A-F]{6})\|((.|\s)*?)\]/i;
function replaceColor(input) {
	while (COLOR_TAG_REGX.test(input)) {
		var color = RegExp.$1,
			inner = RegExp.$2,
			outs;
		var splits = inner.split(VERTICAL_LINE);
		if (splits.length === 2) {
			outs = `<span class="${splits[0]}_${color}">${splits[1]}</span>`;
		} else {
			outs = `<span class="color_${color}">${splits[0]}</span>`;
		}
		input = input.replace("[#" + color + VERTICAL_LINE + inner + "]", outs);
	}
	return input;
}

/**
 * #: 普通链接
 * @: 邮箱
 * $: 图像
 * V: H5视频
 * A: H5音频
 */
const LINK_REGX = /\[(#|@|\$|V|A)\]\(((.|\s)*?)\)/;
function replaceSrcLinks() {

	let links = aspectBase("links");
	links.before = input => {
		while (LINK_REGX.test(input)) {
			let tag = RegExp.$1;
			let value = RegExp.$2;

			let output = ReplaceHolder[tag](value);

			input = links.replace(input, `[${tag}](${value})`, output);
		}
		return input;
	};

	return links;
}

const ReplaceHolder = {
	"#": (input) => { // 链接 [#](url|txt|title|target)

		let splits = input.split(VERTICAL_LINE);
		let url = splits[0];
		let txt = commonReplace(splits[1]) || url;
		let title = (splits.length === 4 ? (splits[2] || url) : url);
		let target = splits[splits.length === 4 ? 3 : 2];

		if (!target || target === "new") { // 目标在新页面中打开，或者写 new 的时候也在新页面打开
			target = "blank";
		}

		return `<a href="${url}" title="${title}" target="_${target}">${txt}</a>`;
	},
	"@": (input) => { // 邮件 [@](url|title)
		let splits = input.split(VERTICAL_LINE);
		let url = splits[0];
		let title = splits[1] || url;

		return `<a href="mailto:${url}">${title}</a>`;
	},
	"$": (input) => { // 图像 [$](url|title|width|height)

		let splits = input.split(VERTICAL_LINE);

		let str = splits[0];
		let title = splits[1] || str;

		let outs = `<img src="${str}" title="${title}"`;

		if (splits[2]) {
			outs += ` width="${splits[2]}"`;
		}
		if (splits[3]) {
			outs += ` height="${splits[3]}"`;
		}
		outs += ` onload="styles.Image.resize(this)" onclick="styles.Image.protoSize(this)" />`;

		return outs;
	},
	"V": (input) => { // 视频 [V](url)

		let inputArr = input.split(VERTICAL_LINE);
		let url = inputArr.shift();
		let args = {};

		parseEqualToObject(inputArr, args);

		return compireH5Video(url, args);
	},
	"A": (input) => { // 音频 [A](url)
		return compireH5Audio(input);
	}
};

const TABLE_REGEX = /(\|(.)+\|\n)+/,
	VERTICAL_BAR = /\|/g;
const TR_JOIN = "</tr><tr>",
	TD_JOIN = "</td><td>",
	TD_START = "<td>",
	TD_END = "</td>",
	TABLE_START = `<table class="table"><tr>`,
	TABLE_END = "</tr></table>";
function replaceTable(input) {

	while ((matches = input.match(TABLE_REGEX)) !== null) {
		let part = matches[0]
		let output = [];

		Array.forEach(part.split(Space.LF), function (i, line) {
			if (i === 1) return;
			if (String.isEmpty(line)) return;
			line = line.slice(1, line.length - 1); // 去掉最开始和最后的 |
			output.push(TD_START + line.replace(VERTICAL_BAR, TD_JOIN) + TD_END);
		});

		let table = TABLE_START + output.join(TR_JOIN) + TABLE_END;

		input = input.replace(part, table);
	}

	return input;
}

const REFERENCE_REGX = /\[\^((\S)+)?\]/;
function replaceReference(input) {

	let tags = new Set(), index = 1;

	while ((matches = input.match(REFERENCE_REGX)) !== null) {

		let part = matches[0];
		let tag = matches[1];

		if (!tags.has(part)) { // 没有出现过
			tags.add(part);
			let html = `<sup id="f_${tag}"><a href="#l_${tag}">${tags.size}</a></sup> `;
			input = input.replace(REFERENCE_REGX, html);
		} else { // 已经记载
			let html = `<a id="l_${tag}" href="#f_${tag}">^</a> ${index}: `;
			input = input.replace(REFERENCE_REGX, html);
			index++;
		}
	}

	return input;
}

const ESCAPER_REGX = /\\\//;
function replaceEscapers() {

	let escapes = aspectBase("escapes");
	escapes.before = input => {
		while ((matches = input.match(ESCAPER_REGX)) !== null) {
			input = escapes.replace(input, matches[0], part);
		}

		return input;
	}
	return escapes;
}

function replaceAlign() {

	let align = aspectBase("align");

	align.before = input => {
		while ((matches = input.match(CENTER_ALIGN_REGX)) !== null) {

			let part = commonReplace(matches[0]);
			let str = part.replace(CENTER_ALIGN_REGX, CENTER_ALIGN_STR);
			input = align.replace(input, part, str);
		}

		while ((matches = input.match(LEFT_ALIGN_REGX)) !== null) {

			let part = commonReplace(matches[0]);
			let str = part.replace(LEFT_ALIGN_REGX, LEFT_ALIGN_STR);
			input = align.replace(input, part, str);
		}

		while ((matches = input.match(RIGHT_ALIGN_REGX)) !== null) {

			let part = commonReplace(matches[0]);
			let str = part.replace(RIGHT_ALIGN_REGX, RIGHT_ALIGN_STR);
			input = align.replace(input, part, str);
		}

		return input;
	};

	return align;
}

const COMMENT_REGX = /\/\*((.|\s)*?)\*\//g,
	ITALIC_REGX = /\/((.|\s){1,})\//g,
	BOLD_REGX = /!((.|\s)*?)!/g,
	DEL_LINE_REGX = /-((.|\s)*?)-/g,
	INS_LINE_REGX = /_((.|\s)*?)_/g,
	CENTER_ALIGN_REGX = /\n>>((.|\s)+?)<<\n/,
	LEFT_ALIGN_REGX = /\n\|\:((.|\s)+?)<<\n/,
	RIGHT_ALIGN_REGX = /\n>>((.|\s)+?)\:\|\n/,
	FONT_SIZE_REGX = /\?\(([1-9]([0-9]?)):((.|\s)*?)\)/,
	H6_REGX = /###### (.*?)(\n|$)/g,
	H5_REGX = /##### (.*?)(\n|$)/g,
	H4_REGX = /#### (.*?)(\n|$)/g,
	H3_REGX = /### (.*?)(\n|$)/g,
	H2_REGX = /## (.*?)(\n|$)/g,
	H1_REGX = /# (.*?)(\n|$)/g;

const ITALIC_STR = "<em>$1</em>",
	BOLD_STR = "<strong>$1</strong>",
	DEL_LINE_STR = "<del>$1</del>",
	INS_LINE_STR = "<ins>$1</ins>",
	CENTER_ALIGN_STR = `<div class="align_center">$1</div>`,
	LEFT_ALIGN_STR = `<div class="align_left">$1</div>`,
	RIGHT_ALIGN_STR = `<div class="align_right">$1</div>`,
	FONT_SIZE_STR = `<span class="size_$1">$3</span>`,
	H6_STR = "<h1 class=\"h6\">$1</h1>",
	H5_STR = "<h1 class=\"h5\">$1</h1>",
	H4_STR = "<h1 class=\"h4\">$1</h1>",
	H3_STR = "<h1 class=\"h3\">$1</h1>",
	H2_STR = "<h1 class=\"h2\">$1</h1>",
	H1_STR = "<h1 class=\"h1\">$1</h1>";

/**
 * 这里的替换在任何位置都可以用到，比如：
 * 链接中的文字
 * 对齐的文字
 */
function commonReplace(input) {

	if (!input) return input;

	input = input.replace(ITALIC_REGX, ITALIC_STR); // 斜体字
	input = input.replace(INS_LINE_REGX, INS_LINE_STR); // 下划线
	input = input.replace(BOLD_REGX, BOLD_STR); // 粗体字
	input = input.replace(DEL_LINE_REGX, DEL_LINE_STR); // 删除线
	input = input.replace(FONT_SIZE_REGX, FONT_SIZE_STR); // 字号
	input = replaceColor(input); // 颜色

	return input;
}

const commons = module.exports = require("./../commons").create((input) => {

	input = input.replace(COMMENT_REGX, String.BLANK); // 去掉注释

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

	// 整个文本中，到处都有需要换行处理的地方，而且换行直接<br /> 更符合我自己的习惯，所以段落处理不再实现
	//input = replaceP(input); // 段落

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

/*
 * 目前不实现清除样式
 */
commons.clear = (str) => {
	return str;
};

commons.getByVersion = (version) => {
	if (!version) {
		return commons;
	} else {
		return require(`./old/${version}`);
	}
}