const { aspectBase } = require("./../lib/utils");
const aspect = aspectBase("image");

const calcMappingCount = require("./../lib/cal-mapping-count");
const calcMapCount = calcMappingCount.get("images");

const IMAGE_REGX = /!\[((.|\s)*?)\]\(((.|\s)*?)\)/;
const IMAGE_CALLING_REGX = /!\{((.|\s)*?)\}/;

const DEFAULT_ALIGN = "left";

function replaceImages (options) {

    let imageAlign = options.image ? options.image.align || DEFAULT_ALIGN : DEFAULT_ALIGN;
    imageAlign = imageAlign.toLowerCase();

    aspect.before = (input) => {

        while((matched = IMAGE_REGX.exec(input)) !== null) {
            let [ proto , name, , src ] = matched;
            const count = calcMapCount(name);

            let img = `<div id="hiton-image-id__${count}" class="hiton-image hiton-align__${imageAlign}"><img src="${src}" />`;
            img += `<div class="hiton-image-name">图：${name}</div></div>`;

            input = aspect.replace(input, proto, img);
        }

        while ((matched = IMAGE_CALLING_REGX.exec(input)) !== null) {
            let [ proto, name ] = matched;
            const count = calcMapCount(name);

            const calling = `<div class="hiton-image-calling"><a href="#hiton-image-id__${count}">图：${name}</a></div>`;
            input = aspect.replace(input, proto, calling);
        }

        return input;
    }

    return aspect;
}

module.exports = exports = replaceImages;