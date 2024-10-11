const { aspectBase } = require("./..//lib/utils");
const aspect = aspectBase("heading");

const { Char } = JsConst;

const BASIC_H6_REGX = /###### (.*?)(\n|$)/g,
    BASIC_H5_REGX = /##### (.*?)(\n|$)/g,
    BASIC_H4_REGX = /#### (.*?)(\n|$)/g,
    BASIC_H3_REGX = /### (.*?)(\n|$)/g,
    BASIC_H2_REGX = /## (.*?)(\n|$)/g,
    BASIC_H1_REGX = /# (.*?)(\n|$)/g,
    COUNTING_H_REGX = /\n(#{1,6}) (.*?)\n/;
    const BASIC_H6_STR = "<h6>$1</h6>",
    BASIC_H5_STR = "<h5>$1</h5>",
    BASIC_H4_STR = "<h4>$1</h4>",
    BASIC_H3_STR = "<h3>$1</h3>",
    BASIC_H2_STR = "<h2>$1</h2>",
    BASIC_H1_STR = "<h1>$1</h1>";


const COUNTING_MODE = "COUNTING-MODE";

function basicMode (input) {
    input = input.replace(BASIC_H6_REGX, BASIC_H6_STR); // 六级标题
    input = input.replace(BASIC_H5_REGX, BASIC_H5_STR); // 五级标题
    input = input.replace(BASIC_H4_REGX, BASIC_H4_STR); // 四级标题
    input = input.replace(BASIC_H3_REGX, BASIC_H3_STR); // 三级标题
    input = input.replace(BASIC_H2_REGX, BASIC_H2_STR); // 二级标题
    input = input.replace(BASIC_H1_REGX, BASIC_H1_STR); // 一级标题

    return input;
}

function highMode() {

    let levelIndex = [ 0, 0, 0, 0, 0, 0 ], lastLevel = 0;

    return (input) => {
        while ((matched = COUNTING_H_REGX.exec(input)) !== null) {
            let [ proto, level, text ] = matched;
            level = level.length;
            text = text.trim();

            if (lastLevel > level) {
				for (let i = level; i < levelIndex.length; i++) {
					levelIndex[i] = 0;
				}
			}
	
			levelIndex[level - 1]++;
            const thisLevel = levelIndex.slice(0, level);

			const chapter = thisLevel.join(Char.POINT);
            const id = thisLevel.join(Char.UNDER_SOURCE);
			lastLevel = level;
	
			const heading = `\n<p id="hiton-heading-id__${id}" class="hiton-counting-mode-heading">${chapter}. ${text}</p>\n`;
			input = aspect.replace(input, proto, heading);
        }

        return input;
    }
}

function replaceHeading (options) {

    _highMode = highMode();

    aspect.before = (input) => {
        const method = (options.heading.toUpperCase() === COUNTING_MODE) ? _highMode : basicMode;
        return method(input);
    }

    return aspect;
}

module.exports = exports = replaceHeading;
