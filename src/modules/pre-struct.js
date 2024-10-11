/**
 * [[
 *   ababa
 *   ababa
 *   ababa
 * ]]
 * => 
 * <pre>
 *   ababa
 *   ababa
 *   ababa
 * </pre>
 * pre 的内部结构只支持行内元素的解析
 */
const replaceInline = require("./inline");
const { aspectBase } = require("./..//lib/utils");
const aspect = aspectBase("pre-struct");

const { Char: { Space: { LF } } } = JsConst;

const PRE_STRUCT_REGX = /\n\[\[\n([\s\S]+\n)\]\]\n/,
        NL_REGX = /\n  /;

function replavePreStruct () {

	aspect.before = (input) => {
		while((matched = PRE_STRUCT_REGX.exec(input)) !== null) {
			let [ proto, text ] = matched; 

            text = text.split(LF).map(line => {
                return line.trim();
            });
            text = text.join(LF);
			text = replaceInline(text);

			const pre = `<pre class="hiton-pre-struct">${text}</pre>`;

			input = aspect.replace(input, proto, pre);
		}

		return input;
	}

	return aspect;
}

module.exports = exports = replavePreStruct;
