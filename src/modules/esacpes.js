const { aspectBase } = require("./../lib/utils");
const aspect = aspectBase("esacpes");

const ESCAPER_REGX = /\\(\S)/;

function replaceEscapes () {
	aspect.before = input => {
		while (matched = (ESCAPER_REGX.exec(input)) !== null) {
			let [ proto, text ] = matched;
			input = aspect.replace(input, proto, text);
		}
		return input;
	};
	
	return aspect;
}

module.exports = exports = replaceEscapes;
