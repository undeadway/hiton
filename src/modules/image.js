const { aspectBase, getMappingCount } = require("./../lib/utils");
const aspect = aspectBase("image");
const calcMapCount = getMappingCount("images");

const IMAGE_REGX = /!\[((.|\s)*?)\]\(((.|\s)*?)\)/,
	IMAGE_CALLING_REGX = /!\{((.|\s)*?)\}/;

const DEFAULT_ALIGN = "left";

function replaceImages (options) {

	let imageAlign = options.image ? options.image.align || DEFAULT_ALIGN : DEFAULT_ALIGN;
	let imageCalling = options.image ? options.image.calling !== false : true;
	imageAlign = imageAlign.toLowerCase();

	aspect.before = (input) => {

		while((matched = IMAGE_REGX.exec(input)) !== null) {
			let [ proto , name, , src ] = matched;
			const count = calcMapCount(name);

			let img = `<div id="p__${count}" class="hiton-image hiton-align__${imageAlign}"><img src="${src}" />`;
			if (imageCalling) {
				img += `<div class="hiton-image-name">图：${name}</div>`;
			}
			img += "</div>";

			input = aspect.replace(input, proto, img);
		}

		if (imageCalling) {
			while ((matched = IMAGE_CALLING_REGX.exec(input)) !== null) {
				let [ proto, name ] = matched;
				const count = calcMapCount(name);
	
				const calling = `<div class="hiton-image-calling"><a href="#p__${count}">图：${name}</a></div>`;
				input = aspect.replace(input, proto, calling);
			}
		}


		return input;
	}

	return aspect;
}

module.exports = exports = replaceImages;
