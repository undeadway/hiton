/*
 * 这是插片（Aspect）的基类，由三个方法组成，
 * 1. before 抽象方法。前处理，因为每种插片的逻辑都不一致，所以需要每个子类自行实现
 * 2. replace 插片内容的替换方法，不需要子类重写
 * 3. after 后处理，将所有插片内容还原为 html 可显示内容
 */
const aspectBase = (aspcetName) => {

	const spects = {};

	return {
		// before 方法需要每个子类自行实现
		replace: (input, proto, value) => {

			let code = (Date.now() * Math.random()).toString();
			code = code.replace(".", "--");

			const key = `${aspcetName}~${code}`;
			input = input.replace(proto, key);
			spects[key] = value;

			return input;
		},
		after: (input) => {
			Object.forEach(spects, (key, val) => {
				input = input.replace(key, val);
			});

			return input;
		}
	}
};

const mappings = {};

function calcMappingCount () {
	const mapping = {};
	let counts = 1;

	function calcMapCount(name) {
		let count = mapping[name];
		if (!count) {
			count = mapping[name] = counts++;
		}
		return count;
	}

	return calcMapCount;
}

module.exports = exports = {
    aspectBase,
	getMappingCount (name) {
		let method = mappings[name];
		if (!method) {
			method = mappings[name] = calcMappingCount();
		}
		return method;
	}
};
