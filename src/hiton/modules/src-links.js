/**
 * [](www.baidu.com) => <a href="www.baidu.com">www.baidu.com</a>
 * [百度](www.baidu.com) => <a href="www.baidu.com">百度</a>
 * [](www.baidu.com "百度一下，你就知道") => <a title="百度一下，你就知道" href="www.baidu.com">www.baidu.com</a>
 * [百度](www.baidu.com "百度一下，你就知道") => <a title="百度一下，你就知道" href="www.baidu.com">百度</a>
 * 
 * <hzwaygc@gmail.com> => <a href="mailto:hzwaygc@gmail.com">hzwaygc@gmail.com</a>
 */
const { Char } = JsConst;
const basicReplace = require("./basic");
const links = require("./../../lib/utils").aspectBase("links");

const LINK_REGX = /\[((.|\s)*?)\]\(((.|\s)*?)( "(.*?)")*\)/;
const MAIL_REGX = /<([a-zA-Z_\-0-9]+@[a-zA-Z_\-0-9]+(\.[a-zA-Z_\-0-9]+)+)>/;


const Links = (hitOn) => {

	links.before = (input) => {
		while ((matched = LINK_REGX.exec(input)) !== null) {
			let [ proto , label, a, href, b, title ] = matched;

			// let [ label, title ] = matched[3].split(Char.Space.SPACE);
			label = label ? basicReplace(label) : href;
			title = title ? `title=${title}` : String.BLANK;

			const link = `<a ${title} href="${href}">${label}</a>`;

			input = links.replace(input, proto, link);
		}

		while ((matched = MAIL_REGX.exec(input)) !== null) {
			const [ proto, href ] = matched;
			const link = `<a href="mailto:${href}">${href}</a>`;

			input = links.replace(input, proto, link);
		}

		return input;
	}

	return links;
}

module.exports = exports = Links;
