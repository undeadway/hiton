/**
 * [](www.baidu.com) => <a href="www.baidu.com">www.baidu.com</a>
 * [百度](www.baidu.com) => <a href="www.baidu.com">百度</a>
 * [](www.baidu.com "百度一下，你就知道") => <a title="百度一下，你就知道" href="www.baidu.com">www.baidu.com</a>
 * [百度](www.baidu.com "百度一下，你就知道") => <a title="百度一下，你就知道" href="www.baidu.com">百度</a>
 * 
 * <hzwaygc@gmail.com> => <a href="mailto:hzwaygc@gmail.com">hzwaygc@gmail.com</a>
 */
const replaceInline = require("./inline");
const { aspectBase } = require("./../lib/utils");
const aspect = aspectBase("links");

const LINK_REGX = /\[((\S|\t| )*?)\]\(((.|\s)+?)( "(.*?)")*\)/;
const MAIL_REGX = /<([a-zA-Z_\-0-9]+@[a-zA-Z_\-0-9]+(\.[a-zA-Z_\-0-9]+)+)>/;

const replaceSrcLinks = () => {

	aspect.before = (input) => {
		while ((matched = LINK_REGX.exec(input)) !== null) {
			let [ proto , label, , href, , title ] = matched;
	
			label = label ? replaceInline(label) : href;
			title = title ? `title=${title}` : String.BLANK;
	
			const link = `<a class="hiton-link" ${title} href="${href}">${label}</a>`;
			input = aspect.replace(input, proto, link);
		}
	
		while ((matched = MAIL_REGX.exec(input)) !== null) {
			const [ proto, href ] = matched;
	
			const mailto = `<a class="hiton-link" href="mailto:${href}">${href}</a>`;
			input = aspect.replace(input, proto, mailto);
		}
	
		return input;
	}

	return aspect;
}

module.exports = exports = replaceSrcLinks;
