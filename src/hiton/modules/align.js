/**
 * 居中对齐 >>居中对齐<<
 * 左对齐  |:左对齐<<
 * 右对齐  >>右对齐:|
 */

const align = require("./../../lib/utils").aspectBase();
const basicReplace = require("./modules/basic");

const 	CENTER_ALIGN_REGX = /\n>>((.|\s)+?)<<\n/,
		LEFT_ALIGN_REGX = /\n\|\:((.|\s)+?)<<\n/,
		RIGHT_ALIGN_REGX = /\n>>((.|\s)+?)\:\|\n/;

const CENTER_ALIGN_STR = `<div class="align_center">$1</div>`,
		LEFT_ALIGN_STR = `<div class="align_left">$1</div>`,
		RIGHT_ALIGN_STR = `<div class="align_right">$1</div>`;

const Align = () => {

	align.before = input => {
		while ((matches = input.match(CENTER_ALIGN_REGX)) !== null) {

			let part = basicReplace(matches[0]);
			let str = part.replace(CENTER_ALIGN_REGX, CENTER_ALIGN_STR);
			input = align.replace(input, part, str);
		}

		while ((matches = input.match(LEFT_ALIGN_REGX)) !== null) {
			let part = basicReplace(matches[0]);
			let str = part.replace(LEFT_ALIGN_REGX, LEFT_ALIGN_STR);
			input = align.replace(input, part, str);
		}

		while ((matches = input.match(RIGHT_ALIGN_REGX)) !== null) {
			let part = basicReplace(matches[0]);
			let str = part.replace(RIGHT_ALIGN_REGX, RIGHT_ALIGN_STR);
			input = align.replace(input, part, str);
		}

		return input;
	};

	return align;
}



module.exports = exports = Align;