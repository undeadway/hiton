/**
 * 居中对齐 >>居中对齐<<
 * 左对齐  |:左对齐<<
 * 右对齐  >>右对齐:|
 */
const replaceInline = require("./inline");
const { aspectBase } = require("./../lib/utils");
const aspect = aspectBase("align");

const 	CENTER_ALIGN_REGX = /\n>>((.|[^\r\n])+?)<<\n/,
		LEFT_ALIGN_REGX = /\n\|\:((.|[^\r\n])+?)<<\n/,
		RIGHT_ALIGN_REGX = /\n>>((.|[^\r\n])+?)\:\|\n/;

const CENTER_ALIGN_STR = `<div class="hiton-align__center">$1</div>`,
		LEFT_ALIGN_STR = `<div class="hiton-align__left">$1</div>`,
		RIGHT_ALIGN_STR = `<div class="hiton-align__right">$1</div>`;

const replaceAlign = () => {

	aspect.before = (input) => {
		while ((matches = input.match(CENTER_ALIGN_REGX)) !== null) {
			let part = replaceInline(matches[0]);
			let str = part.replace(CENTER_ALIGN_REGX, CENTER_ALIGN_STR);
			input = aspect.replace(input, part, str);
		}
	
		while ((matches = input.match(LEFT_ALIGN_REGX)) !== null) {
			let part = replaceInline(matches[0]);
			let str = part.replace(LEFT_ALIGN_REGX, LEFT_ALIGN_STR);
			input = aspect.replace(input, part, str);
		}
	
		while ((matches = input.match(RIGHT_ALIGN_REGX)) !== null) {
			let part = replaceInline(matches[0]);
			let str = part.replace(RIGHT_ALIGN_REGX, RIGHT_ALIGN_STR);
			input = aspect.replace(input, part, str);
		}
	
		return input;
	}

	return aspect;
};

module.exports = exports = replaceAlign;
