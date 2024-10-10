const { HTML: { Unit, Tag } } = JsConst;

const unitSet = (() => {
	const keys = Object.keys(Unit);
	const unitVals = new Set();

	for (const key of keys) {
		unitVals.add(Unit[key]);
	}

	return unitVals;
})();
const Unit_PX = Unit.PX;

const MarkMap = {
	"^": Tag.SUP,
	"!": Tag.SUB
};

const 	ITALIC_REGX = /_((.|\s)*?)_/g,
		BOLD_REGX = /\*\*((.|\s)*?)\*\*/g,
		DEL_LINE_REGX = /~~((.|\s)*?)~~/g,
		INS_LINE_REGX = /==((.|\s)*?)==/g,
		COLOR_REGX = /#\[([0-9a-fA-F]{6})\]\{(.*?)\}/,
		FONT_REGX = /\?\[(\d+(.*?))\]\{(.*?)\}/,
		PHONETIC_REGX = /::\[(.*?)\]\{(.*?)\}/,
		SUP_SUB_REGX = /~(\^|!)\{(.*?)\}/;

const ITALIC_STR = "<em>$1</em>",
		BOLD_STR = "<strong>$1</strong>",
		DEL_LINE_STR = "<del>$1</del>",
		INS_LINE_STR = "<ins>$1</ins>";

function replaceColor (input) {
	while ((matched = COLOR_REGX.exec(input)) !== null) {
		let [ proto, color, value ] = matched;

		value = inlineReplace(value);
		const output = `<span style="color:#${color}">${value}</span>`;

		input = input.replace(proto, output);
	}

	return input;
}

function replaceFont (input) {
	while ((matched = FONT_REGX.exec(input)) !== null) {
		let [ proto, size, unit, value ] = matched;

		unit = unitSet.has[unit.toLowerCase()] ? unit : Unit_PX;

		value = inlineReplace(value);
		const output = `<span style="font-size:${size};">${value}</span>`;

		input = input.replace(proto, output);
	}

	return input;
}

function replacePhonetic (input) {
	while ((matched = PHONETIC_REGX.exec(input)) !== null) {
		let [ proto, text, pronunciation ] = matched;

		text = inlineReplace(text);
		const output = `<ruby>${text}<rp>（</rp><rt>${pronunciation}</rt><rp>）</rp></ruby>`;

		input = input.replace(proto, output);
	}

	return input;
}

function replaceSupSub(input) {
	while((matched = SUP_SUB_REGX.exec(input)) !== null) {
		let [ proto, mark, value ] = matched;

		value = inlineReplace(value);
		mark = MarkMap[mark];

		const output = `<${mark}>${value}</${mark}>`;

		input = input.replace(proto, output);
	}

	return input;
}

/**
 * 这里的替换在任何位置都可以用到，比如：
 * 链接中的文字
 * 对齐的文字
 */
function inlineReplace(input) {

	if (!input) return input;

	input = input.replace(ITALIC_REGX, ITALIC_STR); // 斜体字
	input = input.replace(BOLD_REGX, BOLD_STR); // 粗体字
	input = input.replace(DEL_LINE_REGX, DEL_LINE_STR); // 删除线
	input = input.replace(INS_LINE_REGX, INS_LINE_STR); // 下划线

    input = replaceColor(input); // 颜色
	input = replaceFont(input); // 字号
    input = replacePhonetic(input); // 注音
	input = replaceSupSub(input); // 上下标

	return input;
}

module.exports = exports = inlineReplace;
