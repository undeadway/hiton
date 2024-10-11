
const { getMappingCount } = require("./../lib/utils");
const calcMapCount = getMappingCount("refrence");

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
	"+": Tag.SUB
};

const 	ITALIC_REGX = /_((.|\s)*?)_/g,
		BOLD_REGX = /\*\*((.|\s)*?)\*\*/g,
		DEL_LINE_REGX = /~~((.|\s)*?)~~/g,
		INS_LINE_REGX = /==((.|\s)*?)==/g,
		COLOR_REGX = /#\[([0-9a-fA-F]{6})\]\{(.*?)\}/,
		FONT_REGX = /\?\[((\d+)(.*?))\]\{(.*?)\}/,
		PHONETIC_REGX = /::\[(.*?)\]\{(.*?)\}/,
		SUP_SUB_REGX = /~(\^|\+)\{(.*?)\}/,
		REF_USING_REGX = /\[\^(.+)\]/;

const ITALIC_STR = "<em>$1</em>",
		BOLD_STR = "<strong>$1</strong>",
		DEL_LINE_STR = "<del>$1</del>",
		INS_LINE_STR = "<ins>$1</ins>";

function replaceColor (input) {
	while ((matched = COLOR_REGX.exec(input)) !== null) {
		let [ proto, color, value ] = matched;

		value = replaceInline(value);
		const output = `<span style="color:#${color}">${value}</span>`;

		input = input.replace(proto, output);
	}

	return input;
}

function replaceFont (input) {
	while ((matched = FONT_REGX.exec(input)) !== null) {
		let [ proto, ,size, unit, value ] = matched;

		unit = unitSet.has[unit.toLowerCase()] ? unit : Unit_PX;

		value = replaceInline(value);
		const output = `<span style="font-size:${size}${unit};">${value}</span>`;

		input = input.replace(proto, output);
	}

	return input;
}

function replacePhonetic (input) {
	while ((matched = PHONETIC_REGX.exec(input)) !== null) {
		let [ proto, text, pronunciation ] = matched;

		text = replaceInline(text);
		const output = `<ruby>${text}<rp>（</rp><rt>${pronunciation}</rt><rp>）</rp></ruby>`;

		input = input.replace(proto, output);
	}

	return input;
}

function replaceSupSub(input) {
	while((matched = SUP_SUB_REGX.exec(input)) !== null) {
		let [ proto, mark, value ] = matched;

		value = replaceInline(value);
		mark = MarkMap[mark];

		const output = `<${mark}>${value}</${mark}>`;

		input = input.replace(proto, output);
	}

	return input;
}

// 因为参考的使用属于行内属性，所以就把参考的使用放在这里了
function replaceRefUsing(input) {
	while((matched = REF_USING_REGX.exec(input)) !== null) {
		const [ proto, label ] = matched; 
		const count = calcMapCount(label);

		const usingRef = `<sup id="rsid__${count}"><a href="#rvid__${count}">${label}</a></sup>`;

		input = input.replace(proto, usingRef);
	}

	return input;
}

/**
 * 这里的替换在任何位置都是行内属性
 * 链接中的文字
 * 对齐的文字
 */
function replaceInline(input) {

	if (!input) return input;

	input = input.replace(ITALIC_REGX, ITALIC_STR); // 斜体字
	input = input.replace(BOLD_REGX, BOLD_STR); // 粗体字
	input = input.replace(DEL_LINE_REGX, DEL_LINE_STR); // 删除线
	input = input.replace(INS_LINE_REGX, INS_LINE_STR); // 下划线

	input = replaceColor(input); // 颜色
	input = replaceFont(input); // 字号
	input = replacePhonetic(input); // 注音
	input = replaceSupSub(input); // 上下标
	input = replaceRefUsing(input); // 参考（引用）

	return input;
}

module.exports = exports = replaceInline;
