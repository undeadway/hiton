const { aspectBase } = require("./../lib/utils");
const codes = aspectBase("codes");

const CODES_REGX = /\n```(.*)\n([^`]+?)```\n/;

function replaceCodes (options) {

	codes.before = input => {
		if (options.codes) {
			while ((matched = CODES_REGX.exec(input)) !== null) {
				let [ proto, lang, code ] = matched;
				code = options.codes(code, lang); // 代码需要依赖第三方的代码解析器来实现
				code = `<pre class="hiton-codes">${code}</pre>`;

				input = codes.replace(input, proto, code);
			}
			return input;
		} else {
			return input;
		}
	}

	return codes;
}

module.exports = exports = replaceCodes;
