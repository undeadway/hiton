const { Space } =JsConst;
const TABLE_REGEX = /(\|(.)+\|\n)+/,
	VERTICAL_BAR = /\|/g;
const TR_JOIN = "</tr><tr>",
	TD_JOIN = "</td><td>",
	TD_START = "<td>",
	TD_END = "</td>",
	TABLE_START = `<table class="table"><tr>`,
	TABLE_END = "</tr></table>";

const replaceTable = (input) => {

	while ((matches = input.match(TABLE_REGEX)) !== null) {
		let part = matches[0]
		let output = [];

        Array.forEach(part.split(Space.LF), (i, line) => {
			if (String.isEmpty(line)) return;
			line = line.slice(1, line.length - 1); // 去掉最开始和最后的 |
			output.push(TD_START + line.replace(VERTICAL_BAR, TD_JOIN) + TD_END);
        });

		let table = TABLE_START + output.join(TR_JOIN) + TABLE_END;

		input = input.replace(part, table);
	}

	return input;
}

export default {
    replaceTable
}