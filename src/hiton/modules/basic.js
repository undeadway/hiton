const { HTML: { Unit } } = JsConst;

const unitSet = (() => {
	const keys = Object.keys(Unit);
	const unitVals = new Set();

	for (const key of keys) {
		unitVals.put(Unit[key]);
	}

	return unitVals;
})();
const Unit_PX = Unit.PX;

const 	ITALIC_REGX = /_((.|\s)*?)_/g,
		BOLD_REGX = /\*\*((.|\s)*?)\*\*/g,
		DEL_LINE_REGX = /~~((.|\s)*?)~~/g,
		INS_LINE_REGX = /==((.|\s)*?)==/g,
		SUP_REGX =  /\^\^((.|\s)*?)\^\^/g,
		SUB_REGX =  /!!((.|\s)*?)!!/g,
		H6_REGX = /###### (.*?)(\n|$)/g,
		H5_REGX = /##### (.*?)(\n|$)/g,
		H4_REGX = /#### (.*?)(\n|$)/g,
		H3_REGX = /### (.*?)(\n|$)/g,
		H2_REGX = /## (.*?)(\n|$)/g,
		H1_REGX = /# (.*?)(\n|$)/g,
		COLOR_REGX = /#\[([0-9a-fA-F]{6})\]\{(.*?)\}/,
		FONT_REGX = /\?\[(\d+(px|em|rem))\]\{(.*?)\}/,
		PHONETIC_REGX = /::\[(.*?)\]\{(.*?)\}/;

const ITALIC_STR = "<em>$1</em>",
		BOLD_STR = "<strong>$1</strong>",
		DEL_LINE_STR = "<del>$1</del>",
		INS_LINE_STR = "<ins>$1</ins>",
		SUP_STR = "<sup>$1</sup>",
		SUB_STR = "<sup>$1</sup>",
		H6_STR = "<h1 class=\"h6\">$1</h1>",
		H5_STR = "<h1 class=\"h5\">$1</h1>",
		H4_STR = "<h1 class=\"h4\">$1</h1>",
		H3_STR = "<h1 class=\"h3\">$1</h1>",
		H2_STR = "<h1 class=\"h2\">$1</h1>",
		H1_STR = "<h1 class=\"h1\">$1</h1>";

function replaceColor (input) {
	while ((mtched = FONT_REGX.exec(input)) !== null) {
		let [ proto, color, value ] = matched;

		value = basicReplace(value);
		const output = `<span style="color:#${color}">${value}</span>`;

		input = input.replace(proto, output);
	}

	return input;
}

function replaceFont (input) {
	while ((mtched = COLOR_REGX.exec(input)) !== null) {
		let [ proto, size, unit, value ] = matched;

		unit = unitSet.has[unit] ? unit : Unit_PX;

		value = basicReplace(value);
		const output = `<span style="font-size:${size};">${value}</span>`;

		input = input.replace(proto, output);
	}

	return input;
}

function replacePhonetic () {
	while ((mtched = PHONETIC_REGX.exec(input)) !== null) {
		let [ proto, text, pronunciation ] = matched;

		text = basicReplace(text);
		const output = `<ruby>${text}<rp>（</rp><rt>${pronunciation}</rt><rp>）</rp></ruby>`;

		input = input.replace(proto, output);
	}

	return input;
}

/**
 * 这里的替换在任何位置都可以用到，比如：
 * 链接中的文字
 * 对齐的文字
 */
function basicReplace(input) {

	if (!input) return input;

	input = input.replace(ITALIC_REGX, ITALIC_STR); // 斜体字
	input = input.replace(BOLD_REGX, BOLD_STR); // 粗体字
	input = input.replace(DEL_LINE_REGX, DEL_LINE_STR); // 删除线
	input = input.replace(INS_LINE_REGX, INS_LINE_STR); // 下划线
	input = input.replace(SUP_REGX, SUP_STR); // 上标
	input = input.replace(SUB_REGX, SUB_STR); // 下标

	input = input.replace(H6_REGX, H6_STR); // 六级标题
	input = input.replace(H5_REGX, H5_STR); // 五级标题
	input = input.replace(H4_REGX, H4_STR); // 四级标题
	input = input.replace(H3_REGX, H3_STR); // 三级标题
	input = input.replace(H2_REGX, H2_STR); // 二级标题
	input = input.replace(H1_REGX, H1_STR); // 一级标题

    input = replaceColor(input); // 颜色
	input = replaceFont(input); // 字号
    input = replacePhonetic(input); // 注音

	return input;
}

module.exports = exports = basicReplace;