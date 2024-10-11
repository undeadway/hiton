const { aspectBase } = require("./../lib/utils");
let inlineCode = aspectBase("inlinecode");

const INLINE_CODE_REGX = /`([^`]+?)`/;


function replaceInlineCode () {

	inlineCode.before = input => {
		while ((matched = INLINE_CODE_REGX.exec(input)) !== null) {
			let [ proto, text ] = matched;
			let code = `<code class="code">${text}</code>`;
			input = inlineCode.replace(input, proto, code);
		}
		return input;
	};

	return inlineCode;
}

module.exports = exports = replaceInlineCode;
