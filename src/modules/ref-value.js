/**
 * 因为参考的引用和值属于两种类型，所以这里分开实现
 *
 * [^注1] => <a id="c-a-1" href="#c-v-1"><sup>注1</sup></a>
 *
 * [^注1]: => <div>注1：balaba <a hre="#c-a-1">返回</a></div>
 */
const replaceInline = require("./inline");
const { aspectBase, getMappingCount } = require("./..//lib/utils");
const aspect = aspectBase("reference");
const calcMapCount = getMappingCount("refrence");

const REF_VALUE_REGX = /\n\[\^(.+)\]: (.+)\n/;

function replaceRefValue () {

	aspect.before = (input) => {

		while((matched = REF_VALUE_REGX.exec(input)) !== null) {
			let [ proto, label, text ] = matched; 
			const count = calcMapCount(label);

			text = replaceInline(text);
			const valRef = `<div class="hiton-ref-value" id="rv__${count}""><a href="#rs__${count}">${label}</a>：${text}<a href="#rs__${count}">↰</a></div>`;

			input = aspect.replace(input, proto, valRef);
		}

		return input;
	}

	return aspect;
}

module.exports = exports = replaceRefValue;
