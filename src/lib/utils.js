const side = typeof (window) !== "undefined"; // 设置端点，side = true 浏览器环境 side = false 非浏览器环境
const isBbrowser = () => {
	return side;
}

const checkNumberIsNotEmpty = (input) => {
	if (checkObjectIsNotEmpty(input)) {
		return !isNaN(input);
	} else {
		return false;
	}
}

const checkObjectIsNotEmpty = (input) => {
	// 先去除掉 null、undefined、[]、""
	if (input === null || input === undefined) {
		return false;
	} else if (Array.isArray(input)) {
		return input.length > 0;
	} else if ( typeof(input) === "string") {
		return input.length > 0;
	} else if (typeof(input) === "object") {
		const keys = Object.keys(input);
		return keys.length > 0;
	} else {
		return true;
	}
}

const WEEK_DAYS = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
const MONTH_LIST = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

const getFormattedDate = () => {
	const dt = new Date();
	const day = dt.getDay();
	const month = dt.getMonth();
	const year = dt.getFullYear();
	let date = dt.getDate();
	if (date < 10) {
		date = `0${date}`;
	}
	let hours = dt.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let miinutes = dt.getMinutes();
	if (miinutes < 10) {
		miinutes = `0${miinutes}`;
	}
	let seconds = dt.getSeconds();
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}

	const output = `Date: ${WEEK_DAYS[day]}, ${date} ${MONTH_LIST[month]} ${year} ${hours}:${miinutes}:${seconds} +0800`;
	return output;
}

const decodeHtmlTag = (str) => {

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

const compireObjectToXmlAtruibute = (input) => {

	let str = String.BLANK;

	for (let k in input) {
		let v = input[k];
		str += ` ${k}="${v}"`;
	}

	return str;
}

module.exports = exports = {
	checkNumberIsNotEmpty,
	checkObjectIsNotEmpty,
	isBbrowser,
	getFormattedDate,
    compireObjectToXmlAtruibute,
    aspectBase,
    decodeHtmlTag
};
