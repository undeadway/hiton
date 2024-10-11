/**
 * 因为参考的引用和值属于两种类型，所以这里分开实现
 *
 * [^注1] => <a id="c-a-1" href="#c-v-1"><sup>注1</sup></a>
 *
 * [^注1]: => <div>注1：balaba <a hre="#c-a-1">返回</a></div>
 */
const replaceInline = require("./inline");
const { aspectBase } = require("./..//lib/utils");
const aspect = aspectBase("reference");

const REF_VALUE_REGX = /\n\[\^(.+)\]: (.+)\n/;

function replaceRefValue () {

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
			let [ proto, label, text ] = matched; 
			const count = calcMapCount(label);

			text = replaceInline(text);
			const valRef = `<div id="hiton-ref-val-id__${count}"">${label}：${text} <a href="#hiton-ref-using-id__${count}">返回</a></div>`;

			input = aspect.replace(input, proto, valRef);
		}

		return input;
	}

	return aspect;
}

module.exports = exports = {
	replaceRefUsing,
	replaceRefValue
};
