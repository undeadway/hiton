const { aspectBase } = require("./../lib/utils");
const aspect = aspectBase("inlinecode");

const INLINE_CODE_REGX = /`([^`]+?)`/;


function replaceInlineCode () {

	aspect.before = input => {
		while ((matched = INLINE_CODE_REGX.exec(input)) !== null) {
			let [ proto, text ] = matched;
			let code = `<code class="hiton-span-margin hiton-span-bold hiton-inline-code">${text}</code>`;
			input = aspect.replace(input, proto, code);
		}
		return input;
	};

	return aspect;
}

module.exports = exports = replaceInlineCode;
