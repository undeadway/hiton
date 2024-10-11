/**
 * [^注1] => <a id="c-a-1" href="#c-v-1"><sup>注1</sup></a>
 *
 * [^注1]: => <div>注1：balaba <a hre="#c-a-1">返回</a></div>
 */
const { aspectBase } = require("./../../lib/utils");
const aspect = aspectBase("reference");
const { Char: { Space: { LF } } } =JsConst;

const REF_USING_REGX = /\[\^(.+)\]/,
    REF_VALUE_REGX = /\n\[\^(.+)\]: (.+)\n/;

function replaceReference () {

	const refMapping = {};
	let refCount = 1;

	function calcMapCount(name) {
		let count = refMapping[name];
		if (!count) {
			count = refMapping[name] = refCount++;
		}
		return count;
	}

    aspect.before = (input) => {

        while((matched = REF_VALUE_REGX.exec(input)) !== null) {
            const [ proto, label, text ] = matched; 
            const count = calcMapCount(label);

            const valRef = `<div id="hiton-ref-val-id__${count}"">${label}：${text} <a hre="#hiton-ref-using-id__${count}">返回</a></div>`;

            input = aspect.replace(input, proto, valRef);
            input = LF + input;
        }

        while((matched = REF_USING_REGX.exec(input)) !== null) {
            const [ proto, label ] = matched; 
            const count = calcMapCount(label);

            const usingRef = `<a id="hiton-ref-using-id__${count}" href="#hiton-ref-val-id__${count}"><sup>${label}</sup></a>`;

            input = aspect.replace(input, proto, usingRef);
        }

        return input;
    }

    return aspect;
}

module.exports = exports = replaceReference;
