const { aspectBase } = require("./../lib/utils");
const aspect = aspectBase("quote");

const { Char: { Parenthe, Space: { LF } } } = JsConst;

const MAIN_QUOT_REGX = /(\n(>(.*)\n)+)/,
	NL_RT_ANGLE_GLOBAL_REGX = /\n>/g;
const STRING_QUOTE = "引用";
const QUOTE_PARSE_REGX = /quote~\d+\-\-\d+/;

function replaceQuote() {

	aspect.before = (input) => {
		while ((matchded = MAIN_QUOT_REGX.exec(input)) !== null) { // 获取>列表行，从 \n> 开始 到 >\n 结束，中间每行都以 > 开头 \n 结束
			let protoQuotTxt = matchded[0];
			let quotTxt = protoQuotTxt.replace(NL_RT_ANGLE_GLOBAL_REGX, LF); // 去掉每行开头的 >(&gt;)
			quotTxt = quotTxt.slice(1); // 去掉第一行的换行符
			let indexNL = quotTxt.indexOf(LF);
	
			let quotTtlLn = quotTxt.slice(0, indexNL);
			let hasQuotTtl = String.startsWith(quotTtlLn, Parenthe.LEFT) && String.endsWith(quotTtlLn, Parenthe.RIGHT);
	
			let legend = hasQuotTtl ? quotTtlLn.slice(1, quotTtlLn.length - 1) : STRING_QUOTE;
			let outTxt = hasQuotTtl ? quotTxt.slice(indexNL + 1) : quotTxt;
	
			// 每行的去空格操作
			outTxt = outTxt.split(LF).map((txt) => {
				txt = txt.trim();
				return txt;
			});
			outTxt = outTxt.join(LF);
	
			outTxt = aspect.before(outTxt); // 递归查找看是否有多重引用
			const quote = `<div class="hiton-quote"><fieldset><legend>${legend}</legend>${outTxt}</fieldset></div>`;
			input = aspect.replace(input, protoQuotTxt, quote);
		}
	
		return input;
	}

	// 因为存在多重引用，所以这里需要多重恢复
	const protoAfter = aspect.after;
	aspect.after = (input) => {
		while (QUOTE_PARSE_REGX.exec(input) !== null) {
			input = protoAfter(input);
		}

		return input;
	}

	return aspect;
}

module.exports = exports = replaceQuote;
