const { aspectBase } = require("./../lib/utils");
const codes = aspectBase("codes");

const CODES_REGX = /\n```(.*)\n([^`]+?)```\n/;

function replaceCodes (options) {

	codes.before = input => {
		if (!options.codes) {
			return input;
		} else {
			while ((matched = CODES_REGX.exec(input)) !== null) {
				let [ proto, lang, code ] = matched;
				code = options.codes(code, lang);
				code = `<pre class="language-html">${code}</pre>`;

				input = codes.replace(input, proto, code);
			}
			return input;
		}
	}

	return codes;
}

module.exports = exports = replaceCodes;
