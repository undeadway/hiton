exports.decodeHtmlTag = (str) => {

	str = str.replace(/</g, "&lt;");
	str = str.replace(/>/g, "&gt;");

	return str;
};

/*
 * 这是插片（Aspect）的基类，由三个方法组成，
 * 1. before 抽象方法。前处理，因为每种插片的逻辑都不一致，所以需要每个子类自行实现
 * 2. replace 插片内容的替换方法，不需要子类重写
 * 3. after 后处理，将所有插片内容还原为 html 可显示内容
 */
exports.aspectBase = (key) => {

	const array = [];

	return {
		// before 方法需要每个子类自行实现
		replace: (input, part, str) => {

			input = input.replace(part, `{${key}~${array.length}}`);
			array.push(str);

			return input;
		},
		after: (input) => {
			Array.forEach(array, (i, e) => {
				input = input.replace(`{${key}~${i}}`, e);
			});

			return input;
		}
	}
};

exports.compireObjectToXmlAtruibute = (input) => {

	let str = String.BLANK;

	for (let k in input) {
		let v = input[k];
		str += ` ${k}="${v}"`;
	}

	return str;
}