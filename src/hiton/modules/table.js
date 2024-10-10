const inlineReplace = require("./inline");

const { Char: { Space } } =JsConst;
const TABLE_REGX = /(\|(.)+\|\n)+/,
	VERTICAL_BAR = /\|/g,
	TABLE_DEFINE_REGX = /@\{(.+)\}/,
	TABLE_CALLING_REGX =/@:\{(.+)\}/;
const TR_JOIN = "</tr><tr>",
	TD_JOIN = "</td><td>",
	TD_START = "<td>",
	TD_END = "</td>",
	THEAD_START = "<thead><tr>",
	THEAD_END = "</tr></thead>",
	TBODY_START = "<tbody><tr>",
	TBODY_END = "</tr></tbody>",
	TABLE_START = `<table class="hiton-table">`,
	TABLE_END = "</table>";

const replaceTable = () => {

	const tableMapping = {};
	let tableCount = 1;

	function calcMapCount(name) {
		let count = tableMapping[name];
		if (!count) {
			count = tableMapping[name] = tableCount++;
		}
		return count;
	}

	return (input) => {
		// 表格
		while ((matches = input.match(TABLE_REGX)) !== null) {
			const part = matches[0], output = [];
			let tHead = "";

			Array.forEach(part.split(Space.LF), (index, line) => {
				if (String.isEmpty(line)) return;
				line = line.slice(1, line.length - 1); // 去掉最开始和最后的 |
				line = line.split(VERTICAL_BAR).map(td => {
					td = td.trim();
					td = inlineReplace(td); // 递归调用
					return td;
				});
				if (index === 0) {
					tHead = THEAD_START + TD_START + line.join(TD_JOIN) + TD_END + THEAD_END;
				} else if (index === 1) {
					// TODO 表的第二行定义暂时不做处理
				} else {
					output.push(TD_START + line.join(TD_JOIN) + TD_END);
				}
			});

			let table = TABLE_START + tHead + TBODY_START + output.join(TR_JOIN) + TBODY_END + TABLE_END;
			input = input.replace(part, table);
		}

		// 表格声明
		while ((matched = TABLE_DEFINE_REGX.exec(input)) !== null) {
			const [ proto, name ] = matched;
			const count = calcMapCount(name);

			const output = `<div id="hiton-table-id__${count}" class="hiton-table-define">表：${name}</div>`;
			input = input.replace(proto, output);
		}
		// 表格引用
		while ((matched = TABLE_CALLING_REGX.exec(input)) !== null) {
			const [ proto, name ] = matched;
			const count = calcMapCount(name);

			const output = `<a class="hiton-span-bold hiton-span-margin hiton-table-calling" href="#hiton-table-id__${count}">表：${name}</a>`;
			input = input.replace(proto, output);
		}

		return input;
	}
}

module.exports = exports = replaceTable;
