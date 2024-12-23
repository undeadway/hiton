const { aspectBase } = require("./../lib/utils");
const aspect = aspectBase("list");

const { Char: { Space: { LF } } } = JsConst;
const UL_REGX = /\n(\* [\s\S]+\n)+/,
	OL_1_REGX = /\n([0-9]+\. [\s\S]+\n)+/,
	OL_A_REGX = /\n([a-zA-Z]+\. [\s\S]+\n)+/,
	UL_SPLIT_REGX = "\n\* ",
	TYPE_1_SPLIT_REGX = /\n[0-9]+\. /g,
	TYPE_A_SPLIT_REGX = /\n[a-zA-Z]+\. /g;

const LI_START_TAG = "<li>",
	LI_END_TAG = "</li>",
	UL_START_TAG = "<ul>",
	UL_END_TAG = "</ul>",
	LI_JOIN = "</li><li>",
	OL_1_START_TAG = `<ol type="1">`,
	OL_A_START_TAG = `<ol type="a">`,
	OL_END_TAG = "</ol>";

const LIST_PARSE_REGX = /list~\d+\-\-\d+/;

function replaceList() {

	aspect.before = (input) => {

		// ul
		while ((matches = input.match(UL_REGX)) !== null) {
			let [ proto ] = matches;
			let text = proto;
			const output = [];

			// 用 \n* 分割数据
			text.split(UL_SPLIT_REGX).map(part => {
				if (part && part !== LF) {
					// 分割出来的再进行内部处理
					part = part.split(LF).map(line => {
						return line.trim();
					});
					part = part.join(LF) + LF;
					part = aspect.before(part);
					output.push(part);
				}
			});

			text = UL_START_TAG + LI_START_TAG + output.join(LI_JOIN) + LI_END_TAG + UL_END_TAG;
			text = `<div class="hiton-list">${text}</div>`;
			input = aspect.replace(input, proto, text);
		}

		// ol 1
		while ((matches = input.match(OL_1_REGX)) !== null) {
			let [ proto ] = matches;
			let text = proto;
			const output = [];

			// 用 \n* 分割数据
			text.split(TYPE_1_SPLIT_REGX).map(part => {
				if (part && part !== LF) {
					// 分割出来的再进行内部处理
					part = part.split(LF).map(line => {
						return line.trim();
					});
					part = part.join(LF) + LF;
					part = aspect.before(part);
					output.push(part);
				}
			});

			text = OL_1_START_TAG + LI_START_TAG + output.join(LI_JOIN) + LI_END_TAG + OL_END_TAG;
			input = aspect.replace(input, proto, text);
		}

		// ol A
		while ((matches = input.match(OL_A_REGX)) !== null) {
			let [ proto ] = matches;
			let text = proto;
			const output = [];

			// 用 \n* 分割数据
			text.split(TYPE_A_SPLIT_REGX).map(part => {
				if (part && part !== LF) {
					// 分割出来的再进行内部处理
					part = part.split(LF).map(line => {
						return line.trim();
					});
					part = part.join(LF) + LF;
					part = aspect.before(part);
					output.push(part);
				}
			});

			text = OL_A_START_TAG + LI_START_TAG + output.join(LI_JOIN) + LI_END_TAG + OL_END_TAG;
			input = aspect.replace(input, proto, text);
		}

		return input;
	}

	
	// 因为存在多重列表，所以这里需要多重恢复
	const protoAfter = aspect.after;
	aspect.after = (input) => {
		while (LIST_PARSE_REGX.exec(input) !== null) {
			input = protoAfter(input);
		}

		return input;
	}

	return aspect;
};

module.exports = exports = replaceList;
