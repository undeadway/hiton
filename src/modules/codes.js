const { aspectBase } = require("./../lib/utils");
const aspect = aspectBase("codes");

const CODES_REGX = /\n```(.*)\n([\s\S]+?)```\n/;

function replaceCodes (options) {

	aspect.before = input => {
		if (options.codes) {
			while ((matched = CODES_REGX.exec(input)) !== null) {
				let [ proto, lang, code ] = matched;
				code = options.codes(code, lang); // 代码需要依赖第三方的代码解析器来实现
				code = `<pre class="hiton-codes">${code}</pre>`;

				input = aspect.replace(input, proto, code);
			}
			return input;
		} else {
			return input;
		}
	}

	return aspect;
}

module.exports = exports = replaceCodes;
