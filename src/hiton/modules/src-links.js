/**
 * [](www.baidu.com) => <a href="www.baidu.com">www.baidu.com</a>
 * [百度](www.baidu.com) => <a href="www.baidu.com">百度</a>
 * [百度](www.baidu.com "这里是百度") => <a title="这里是百度" href="www.baidu.com">百度</a>
 * 
 * <hzwaygc@gmail.com> => <a href="mailto:hzwaygc@gmail.com">hzwaygc@gmail.com</a>
 */
const { Char } = JsConst;
const basicReplace = require("./modules/basic");
const links = require("./../../lib/utils").aspectBase();

const LINK_REGX = /\[((.|\s)*?)\]\(((.|\s)*?)\)/;
const MAIL_REGX = /<([a-zA-Z_\-0-9]+@[a-zA-Z_\-0-9]+(\.[a-zA-Z_\-0-9]+)+)>/;


const Links = (hitOn) => {

	links.before = (input) => {
		while ((matched = LINK_REGX.exec(input)) !== null) {
			const proto = matched[0];
			const href = matched[3];

			let [ label, title ] = matched[1].split(Char.SPACE);
			label = label ? label : href;

			label = basicReplace(label);

			const link = `<a title="${title}" href="${href}">${label}</a>`;

			input = links.replace(input, proto, link);
		}

		while ((matched = MAIL_REGX.exec(input)) !== null) {
			const [ proto, href ] = matched;
			const link = `<a href="mailto:${href}"${href}></a>`;

			input = links.replace(input, proto, link);
		}
	}

	return links;
}

module.exports = exports = Links;