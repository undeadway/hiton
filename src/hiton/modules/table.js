const { Char: { Space } } =JsConst;
const TABLE_REGEX = /(\|(.)+\|\n)+/,
	VERTICAL_BAR = /\|/g;
const TR_JOIN = "</tr><tr>",
	TD_JOIN = "</td><td>",
	TD_START = "<td>",
	TD_END = "</td>",
	THEAD_START = "<thead><tr>",
	THEAD_END = "</tr></thead>",
	TBODY_START = "<tbody><tr>",
	TBODY_END = "</tr></tbody>",
	TABLE_START = `<table class="table">`,
	TABLE_END = "</table>";

const replaceTable = (hitOn, input) => {

	while ((matches = input.match(TABLE_REGEX)) !== null) {
		const part = matches[0], output = [];
		let tHead = "";

        Array.forEach(part.split(Space.LF), (index, line) => {
			if (String.isEmpty(line)) return;
			line = line.slice(1, line.length - 1); // 去掉最开始和最后的 |
			line = line.split(VERTICAL_BAR).map(td => {
				td = td.trim();
				td = hitOn.parse(td);
				return td;
			});
			if (index === 0) {
				tHead = THEAD_START + TD_START + line.join(TD_JOIN) + TD_END + THEAD_END;
			} else if (index !== 1) {
				output.push(TD_START + line.join(TD_JOIN) + TD_END);
			}
        });

		const tBody = TBODY_START + output.join(TR_JOIN) + TBODY_END;

		let table = TABLE_START + tHead + tBody + TABLE_END;

		input = input.replace(part, table);
	}

	return input;
}

module.exports = exports = replaceTable;