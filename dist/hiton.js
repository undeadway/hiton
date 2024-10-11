/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, exports, __webpack_require__) => {

eval("const { aspectBase, getMappingCount } = __webpack_require__(/*! ./lib/utils */ \"./src/lib/utils.js\");\r\n\r\nconst { Char: { Space: { LF } } } = JsConst;\r\n\r\nconst NL_REGX = /  \\n/g,\r\n\t\tN_REGX = /\\n/g,\r\n\t\tNEW_LINE_REGX = /\\r\\n/g,\r\n\t\tCOMMENT_REGX = /\\/\\*((.|\\s)*?)\\*\\//g;\r\nconst BR_TAG = \"<br />\";\r\nconst TWO_LF = `${LF}${LF}`;\r\n\r\nconst replaceSrcLinks = __webpack_require__(/*! ./modules/src-links */ \"./src/modules/src-links.js\");\r\nconst replaceImages = __webpack_require__(/*! ./modules/image */ \"./src/modules/image.js\");\r\nconst replaceAlign = __webpack_require__(/*! ./modules/align */ \"./src/modules/align.js\");\r\nconst replaceQuote = __webpack_require__(/*! ./modules/quote */ \"./src/modules/quote.js\");\r\nconst replaceList = __webpack_require__(/*! ./modules/list */ \"./src/modules/list.js\");\r\nconst replaceHeading = __webpack_require__(/*! ./modules/heading */ \"./src/modules/heading.js\");\r\nconst replaceTable = __webpack_require__(/*! ./modules/table */ \"./src/modules/table.js\");\r\nconst replaceRefValue = __webpack_require__(/*! ./modules/ref-value */ \"./src/modules/ref-value.js\");\r\nconst replaceInlineCode = __webpack_require__(/*! ./modules/inline-code */ \"./src/modules/inline-code.js\");\r\nconst reaplceEscapes = __webpack_require__(/*! ./modules/esacpes */ \"./src/modules/esacpes.js\");\r\nconst replaceInline = __webpack_require__(/*! ./modules/inline */ \"./src/modules/inline.js\");\r\n\r\nfunction parser (input, options) {\r\n\ttry {\r\n\t\tinput = input.replace(NEW_LINE_REGX, LF);\r\n\t\tinput = input.replace(COMMENT_REGX, String.BLANK); // 去掉注释\r\n\r\n\t\t// 因为复杂结构可能含有 `__` 等字符，所以全部由 aspcet 形式来实现\r\n\t\tconst _replaceHeading = replaceHeading(options);\r\n\t\tconst _replaceSrcLinks = replaceSrcLinks(); // 外部连接（链接、邮箱）\r\n\t\tconst _replaceImages = replaceImages(options); // 图片（图片、图片引用）\r\n\t\tconst _replaceTable = replaceTable(); // 表格（表格、表格定义、表格引用）\r\n\t\tconst _replaceQuote = replaceQuote(); // 引用\r\n\t\tconst _replaceList = replaceList(); // 列表\r\n\t\tconst _replaceAlign = replaceAlign(); // 对齐\r\n\t\tconst _replaceRefValue = replaceRefValue(); // 参考（值）\r\n\t\tconst _replaceInlineCode = replaceInlineCode(); // 行内代码\r\n\t\tconst _reaplceEscapes = reaplceEscapes(); // 转义字符\r\n\r\n\t\tconst output = [];\r\n\t\tArray.forEach(input.split(TWO_LF), (index, string) => {\r\n\r\n\t\t\tstring = LF + string + LF;\r\n\r\n\t\t\tstring = _reaplceEscapes.before(string);\r\n\t\t\tstring = _replaceInlineCode.before(string);\r\n\t\t\tstring = _replaceImages.before(string);\r\n\t\t\tstring = _replaceAlign.before(string);\r\n\t\t\tstring = _replaceSrcLinks.before(string);\r\n\t\t\tstring = _replaceTable.before(string);\r\n\t\t\tstring = _replaceHeading.before(string);\r\n\t\t\tstring = _replaceList.before(string);\r\n\t\t\tstring = _replaceRefValue.before(string);\r\n\t\t\tstring = _replaceQuote.before(string);\r\n\r\n\t\t\tstring = replaceInline(string); // 行内设置\r\n\r\n\t\t\tstring = _replaceQuote.after(string);\r\n\t\t\tstring = _replaceRefValue.after(string);\r\n\t\t\tstring = _replaceList.after(string);\r\n\t\t\tstring = _replaceHeading.after(string);\r\n\t\t\tstring = _replaceTable.after(string);\r\n\t\t\tstring = _replaceSrcLinks.after(string);\r\n\t\t\tstring = _replaceAlign.after(string);\r\n\t\t\tstring = _replaceImages.after(string);\r\n\t\t\tstring = _replaceInlineCode.after(string);\r\n\t\t\tstring = _reaplceEscapes.after(string);\r\n\r\n\t\t\tstring = string.replace(NL_REGX, BR_TAG); // 单行换行\r\n\t\t\tstring = string.replace(N_REGX, String.BLANK);// \\n => 一个空白\r\n\r\n\t\t\toutput.push(string);\r\n\t\t});\r\n\r\n\t\tinput =  input = \"<p>\" + output.join(\"</p><p>\") + \"</p>\";\r\n\t} catch(err) {\r\n\t\tconsole.log(err);\r\n\t}\r\n\r\n\treturn input;\r\n}\r\n\r\nmodule.exports = exports = {\r\n\tcreate: (options, aspects = []) => {\r\n\r\n\t\tfunction replaceURI(str) {\r\n\r\n\t\t\ttry {\r\n\t\t\t\treturn decodeURIComponent(str);// 最后的转义出处理\r\n\t\t\t} catch (e) {\r\n\t\t\t\t// 如果出错，就当不存在，直接输出原始内容\r\n\t\t\t\treturn str;\r\n\t\t\t}\r\n\t\t}\r\n\t\r\n\t\treturn {\r\n\t\t\tparse: (str) => {\r\n\t\t\t\tArray.forEach(aspects, (index, aspect) => { // 定制插片前处理\r\n\t\t\t\t\tstr = aspect.before(str);\r\n\t\t\t\t});\r\n\r\n\t\t\t\tstr = parser(str, options);\r\n\r\n\t\t\t\t// 插片后处理\r\n\t\t\t\tArray.forEach(aspects, (index, aspcet) => {\r\n\t\t\t\t\tstr = aspcet.after(str);\r\n\t\t\t\t});\r\n\r\n\t\t\t\treturn replaceURI(str);\r\n\t\t\t}\r\n\t\t};\r\n\t},\r\n\tcreateAspect : (name, before) => {\r\n\t\tconst aspcet = aspectBase(name);\r\n\t\taspcet.before = before;\r\n\t\treturn aspcet;\r\n\t},\r\n\tgetMappingCount (name) {\r\n\t\treturn getMappingCount(name);\r\n\t}\r\n};\r\n\n\n//# sourceURL=webpack://hiton/./src/index.js?");

/***/ }),

/***/ "./src/lib/utils.js":
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/***/ ((module, exports) => {

eval("/*\r\n * 这是插片（Aspect）的基类，由三个方法组成，\r\n * 1. before 抽象方法。前处理，因为每种插片的逻辑都不一致，所以需要每个子类自行实现\r\n * 2. replace 插片内容的替换方法，不需要子类重写\r\n * 3. after 后处理，将所有插片内容还原为 html 可显示内容\r\n */\r\nconst aspectBase = (aspcetName) => {\r\n\r\n\tconst spects = {};\r\n\r\n\treturn {\r\n\t\t// before 方法需要每个子类自行实现\r\n\t\treplace: (input, proto, value) => {\r\n\r\n\t\t\tlet code = (Date.now() * Math.random()).toString();\r\n\t\t\tcode = code.replace(\".\", \"--\");\r\n\r\n\t\t\tconst key = `${aspcetName}~${code}`;\r\n\t\t\tinput = input.replace(proto, key);\r\n\t\t\tspects[key] = value;\r\n\r\n\t\t\treturn input;\r\n\t\t},\r\n\t\tafter: (input) => {\r\n\t\t\tObject.forEach(spects, (key, val) => {\r\n\t\t\t\tinput = input.replace(key, val);\r\n\t\t\t});\r\n\r\n\t\t\treturn input;\r\n\t\t}\r\n\t}\r\n};\r\n\r\nconst mappings = {};\r\n\r\nfunction calcMappingCount () {\r\n\tconst mapping = {};\r\n\tlet counts = 1;\r\n\r\n\tfunction calcMapCount(name) {\r\n\t\tlet count = mapping[name];\r\n\t\tif (!count) {\r\n\t\t\tcount = mapping[name] = counts++;\r\n\t\t}\r\n\t\treturn count;\r\n\t}\r\n\r\n\treturn calcMapCount;\r\n}\r\n\r\nmodule.exports = exports = {\r\n    aspectBase,\r\n\tgetMappingCount (name) {\r\n\t\tlet method = mappings[name];\r\n\t\tif (!method) {\r\n\t\t\tmethod = mappings[name] = calcMappingCount();\r\n\t\t}\r\n\t\treturn method;\r\n\t}\r\n};\r\n\n\n//# sourceURL=webpack://hiton/./src/lib/utils.js?");

/***/ }),

/***/ "./src/modules/align.js":
/*!******************************!*\
  !*** ./src/modules/align.js ***!
  \******************************/
/***/ ((module, exports, __webpack_require__) => {

eval("/**\r\n * 居中对齐 >>居中对齐<<\r\n * 左对齐  |:左对齐<<\r\n * 右对齐  >>右对齐:|\r\n */\r\nconst replaceInline = __webpack_require__(/*! ./inline */ \"./src/modules/inline.js\");\r\nconst { aspectBase } = __webpack_require__(/*! ./../lib/utils */ \"./src/lib/utils.js\");\r\nconst aspect = aspectBase(\"align\");\r\n\r\nconst \tCENTER_ALIGN_REGX = /\\n>>((.|\\s)+?)<<\\n/,\r\n\t\tLEFT_ALIGN_REGX = /\\n\\|\\:((.|\\s)+?)<<\\n/,\r\n\t\tRIGHT_ALIGN_REGX = /\\n>>((.|\\s)+?)\\:\\|\\n/;\r\n\r\nconst CENTER_ALIGN_STR = `<div class=\"hiton_align_center\">$1</div>`,\r\n\t\tLEFT_ALIGN_STR = `<div class=\"hiton_align_left\">$1</div>`,\r\n\t\tRIGHT_ALIGN_STR = `<div class=\"hiton_align_right\">$1</div>`;\r\n\r\nconst replaceAlign = () => {\r\n\r\n\taspect.before = (input) => {\r\n\t\twhile ((matches = input.match(CENTER_ALIGN_REGX)) !== null) {\r\n\t\t\tlet part = replaceInline(matches[0]);\r\n\t\t\tlet str = part.replace(CENTER_ALIGN_REGX, CENTER_ALIGN_STR);\r\n\t\t\tinput = aspect.replace(input, part, str);\r\n\t\t}\r\n\t\r\n\t\twhile ((matches = input.match(LEFT_ALIGN_REGX)) !== null) {\r\n\t\t\tlet part = replaceInline(matches[0]);\r\n\t\t\tlet str = part.replace(LEFT_ALIGN_REGX, LEFT_ALIGN_STR);\r\n\t\t\tinput = aspect.replace(input, part, str);\r\n\t\t}\r\n\t\r\n\t\twhile ((matches = input.match(RIGHT_ALIGN_REGX)) !== null) {\r\n\t\t\tlet part = replaceInline(matches[0]);\r\n\t\t\tlet str = part.replace(RIGHT_ALIGN_REGX, RIGHT_ALIGN_STR);\r\n\t\t\tinput = aspect.replace(input, part, str);\r\n\t\t}\r\n\t\r\n\t\treturn input;\r\n\t}\r\n\r\n\treturn aspect;\r\n};\r\n\r\nmodule.exports = exports = replaceAlign;\r\n\n\n//# sourceURL=webpack://hiton/./src/modules/align.js?");

/***/ }),

/***/ "./src/modules/esacpes.js":
/*!********************************!*\
  !*** ./src/modules/esacpes.js ***!
  \********************************/
/***/ ((module, exports, __webpack_require__) => {

eval("const { aspectBase } = __webpack_require__(/*! ./../lib/utils */ \"./src/lib/utils.js\");\r\nlet esacpes = aspectBase(\"esacpes\");\r\n\r\nconst ESCAPER_REGX = /\\\\(\\S)/;\r\n\r\nfunction replaceEscapes () {\r\n\tesacpes.before = input => {\r\n\t\twhile (matched = (ESCAPER_REGX.exec(input)) !== null) {\r\n\t\t\tlet [ proto, text ] = matched;\r\n\t\t\tinput = esacpes.replace(input, proto, text);\r\n\t\t}\r\n\t\treturn input;\r\n\t};\r\n\t\r\n\treturn esacpes;\r\n}\r\n\r\nmodule.exports = exports = replaceEscapes;\r\n\n\n//# sourceURL=webpack://hiton/./src/modules/esacpes.js?");

/***/ }),

/***/ "./src/modules/heading.js":
/*!********************************!*\
  !*** ./src/modules/heading.js ***!
  \********************************/
/***/ ((module, exports, __webpack_require__) => {

eval("const { aspectBase } = __webpack_require__(/*! ./../lib/utils */ \"./src/lib/utils.js\");\r\nconst aspect = aspectBase(\"heading\");\r\n\r\nconst { Char } = JsConst;\r\n\r\nconst BASIC_H6_REGX = /###### (.*?)(\\n|$)/g,\r\n\tBASIC_H5_REGX = /##### (.*?)(\\n|$)/g,\r\n\tBASIC_H4_REGX = /#### (.*?)(\\n|$)/g,\r\n\tBASIC_H3_REGX = /### (.*?)(\\n|$)/g,\r\n\tBASIC_H2_REGX = /## (.*?)(\\n|$)/g,\r\n\tBASIC_H1_REGX = /# (.*?)(\\n|$)/g,\r\n\tCOUNTING_H_REGX = /\\n(#{1,6}) (.*?)\\n/;\r\n\tconst BASIC_H6_STR = \"<h6>$1</h6>\",\r\n\tBASIC_H5_STR = \"<h5>$1</h5>\",\r\n\tBASIC_H4_STR = \"<h4>$1</h4>\",\r\n\tBASIC_H3_STR = \"<h3>$1</h3>\",\r\n\tBASIC_H2_STR = \"<h2>$1</h2>\",\r\n\tBASIC_H1_STR = \"<h1>$1</h1>\";\r\n\r\n\r\nconst COUNTING_MODE = \"COUNTING-MODE\";\r\n\r\nfunction basicMode (input) {\r\n\tinput = input.replace(BASIC_H6_REGX, BASIC_H6_STR); // 六级标题\r\n\tinput = input.replace(BASIC_H5_REGX, BASIC_H5_STR); // 五级标题\r\n\tinput = input.replace(BASIC_H4_REGX, BASIC_H4_STR); // 四级标题\r\n\tinput = input.replace(BASIC_H3_REGX, BASIC_H3_STR); // 三级标题\r\n\tinput = input.replace(BASIC_H2_REGX, BASIC_H2_STR); // 二级标题\r\n\tinput = input.replace(BASIC_H1_REGX, BASIC_H1_STR); // 一级标题\r\n\r\n\treturn input;\r\n}\r\n\r\nfunction highMode() {\r\n\r\n\tlet levelIndex = [ 0, 0, 0, 0, 0, 0 ], lastLevel = 0;\r\n\r\n\treturn (input) => {\r\n\t\twhile ((matched = COUNTING_H_REGX.exec(input)) !== null) {\r\n\t\t\tlet [ proto, level, text ] = matched;\r\n\t\t\tlevel = level.length;\r\n\t\t\ttext = text.trim();\r\n\r\n\t\t\tif (lastLevel > level) {\r\n\t\t\t\tfor (let i = level; i < levelIndex.length; i++) {\r\n\t\t\t\t\tlevelIndex[i] = 0;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\r\n\t\t\tlevelIndex[level - 1]++;\r\n\t\t\tconst thisLevel = levelIndex.slice(0, level);\r\n\r\n\t\t\tconst chapter = thisLevel.join(Char.POINT);\r\n\t\t\tconst id = thisLevel.join(Char.UNDER_SOURCE);\r\n\t\t\tlastLevel = level;\r\n\t\r\n\t\t\tconst heading = `\\n<p id=\"h__${id}\" class=\"hiton-counting-mode-heading\">${chapter}. ${text}</p>\\n`;\r\n\t\t\tinput = aspect.replace(input, proto, heading);\r\n\t\t}\r\n\r\n\t\treturn input;\r\n\t}\r\n}\r\n\r\nfunction replaceHeading (options) {\r\n\r\n\t_highMode = highMode();\r\n\r\n\taspect.before = (input) => {\r\n\t\tconst method = (options.heading.toUpperCase() === COUNTING_MODE) ? _highMode : basicMode;\r\n\t\treturn method(input);\r\n\t}\r\n\r\n\treturn aspect;\r\n}\r\n\r\nmodule.exports = exports = replaceHeading;\r\n\n\n//# sourceURL=webpack://hiton/./src/modules/heading.js?");

/***/ }),

/***/ "./src/modules/image.js":
/*!******************************!*\
  !*** ./src/modules/image.js ***!
  \******************************/
/***/ ((module, exports, __webpack_require__) => {

eval("const { aspectBase, getMappingCount } = __webpack_require__(/*! ./../lib/utils */ \"./src/lib/utils.js\");\r\nconst aspect = aspectBase(\"image\");\r\nconst calcMapCount = getMappingCount(\"images\");\r\n\r\nconst IMAGE_REGX = /!\\[((.|\\s)*?)\\]\\(((.|\\s)*?)\\)/;\r\nconst IMAGE_CALLING_REGX = /!\\{((.|\\s)*?)\\}/;\r\n\r\nconst DEFAULT_ALIGN = \"left\";\r\n\r\nfunction replaceImages (options) {\r\n\r\n\tlet imageAlign = options.image ? options.image.align || DEFAULT_ALIGN : DEFAULT_ALIGN;\r\n\timageAlign = imageAlign.toLowerCase();\r\n\r\n\taspect.before = (input) => {\r\n\r\n\t\twhile((matched = IMAGE_REGX.exec(input)) !== null) {\r\n\t\t\tlet [ proto , name, , src ] = matched;\r\n\t\t\tconst count = calcMapCount(name);\r\n\r\n\t\t\tlet img = `<div id=\"p__${count}\" class=\"hiton-image hiton-align__${imageAlign}\"><img src=\"${src}\" />`;\r\n\t\t\timg += `<div class=\"hiton-image-name\">图：${name}</div></div>`;\r\n\r\n\t\t\tinput = aspect.replace(input, proto, img);\r\n\t\t}\r\n\r\n\t\twhile ((matched = IMAGE_CALLING_REGX.exec(input)) !== null) {\r\n\t\t\tlet [ proto, name ] = matched;\r\n\t\t\tconst count = calcMapCount(name);\r\n\r\n\t\t\tconst calling = `<div class=\"hiton-image-calling\"><a href=\"#p__${count}\">图：${name}</a></div>`;\r\n\t\t\tinput = aspect.replace(input, proto, calling);\r\n\t\t}\r\n\r\n\t\treturn input;\r\n\t}\r\n\r\n\treturn aspect;\r\n}\r\n\r\nmodule.exports = exports = replaceImages;\r\n\n\n//# sourceURL=webpack://hiton/./src/modules/image.js?");

/***/ }),

/***/ "./src/modules/inline-code.js":
/*!************************************!*\
  !*** ./src/modules/inline-code.js ***!
  \************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("const { aspectBase } = __webpack_require__(/*! ./../lib/utils */ \"./src/lib/utils.js\");\r\nlet inlineCode = aspectBase(\"inlinecode\");\r\n\r\nconst INLINE_CODE_REGX = /`([^`]+?)`/;\r\n\r\n\r\nfunction replaceInlineCode () {\r\n\r\n\tinlineCode.before = input => {\r\n\t\twhile ((matched = INLINE_CODE_REGX.exec(input)) !== null) {\r\n\t\t\tlet [ proto, text ] = matched;\r\n\t\t\tlet code = `<code class=\"code\">${text}</code>`;\r\n\t\t\tinput = inlineCode.replace(input, proto, code);\r\n\t\t}\r\n\t\treturn input;\r\n\t};\r\n\r\n\treturn inlineCode;\r\n}\r\n\r\nmodule.exports = exports = replaceInlineCode;\r\n\n\n//# sourceURL=webpack://hiton/./src/modules/inline-code.js?");

/***/ }),

/***/ "./src/modules/inline.js":
/*!*******************************!*\
  !*** ./src/modules/inline.js ***!
  \*******************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\r\nconst { getMappingCount } = __webpack_require__(/*! ./../lib/utils */ \"./src/lib/utils.js\");\r\nconst calcMapCount = getMappingCount(\"refrence\");\r\n\r\nconst { HTML: { Unit, Tag } } = JsConst;\r\n\r\nconst unitSet = (() => {\r\n\tconst keys = Object.keys(Unit);\r\n\tconst unitVals = new Set();\r\n\r\n\tfor (const key of keys) {\r\n\t\tunitVals.add(Unit[key]);\r\n\t}\r\n\r\n\treturn unitVals;\r\n})();\r\nconst Unit_PX = Unit.PX;\r\n\r\nconst MarkMap = {\r\n\t\"^\": Tag.SUP,\r\n\t\"+\": Tag.SUB\r\n};\r\n\r\nconst \tITALIC_REGX = /_((.|\\s)*?)_/g,\r\n\t\tBOLD_REGX = /\\*\\*((.|\\s)*?)\\*\\*/g,\r\n\t\tDEL_LINE_REGX = /~~((.|\\s)*?)~~/g,\r\n\t\tINS_LINE_REGX = /==((.|\\s)*?)==/g,\r\n\t\tCOLOR_REGX = /#\\[([0-9a-fA-F]{6})\\]\\{(.*?)\\}/,\r\n\t\tFONT_REGX = /\\?\\[((\\d+)(.*?))\\]\\{(.*?)\\}/,\r\n\t\tPHONETIC_REGX = /::\\[(.*?)\\]\\{(.*?)\\}/,\r\n\t\tSUP_SUB_REGX = /~(\\^|\\+)\\{(.*?)\\}/,\r\n\t\tREF_USING_REGX = /\\[\\^(.+)\\]/;\r\n\r\nconst ITALIC_STR = \"<em>$1</em>\",\r\n\t\tBOLD_STR = \"<strong>$1</strong>\",\r\n\t\tDEL_LINE_STR = \"<del>$1</del>\",\r\n\t\tINS_LINE_STR = \"<ins>$1</ins>\";\r\n\r\nfunction replaceColor (input) {\r\n\twhile ((matched = COLOR_REGX.exec(input)) !== null) {\r\n\t\tlet [ proto, color, value ] = matched;\r\n\r\n\t\tvalue = replaceInline(value);\r\n\t\tconst output = `<span style=\"color:#${color}\">${value}</span>`;\r\n\r\n\t\tinput = input.replace(proto, output);\r\n\t}\r\n\r\n\treturn input;\r\n}\r\n\r\nfunction replaceFont (input) {\r\n\twhile ((matched = FONT_REGX.exec(input)) !== null) {\r\n\t\tlet [ proto, ,size, unit, value ] = matched;\r\n\r\n\t\tunit = unitSet.has[unit.toLowerCase()] ? unit : Unit_PX;\r\n\r\n\t\tvalue = replaceInline(value);\r\n\t\tconst output = `<span style=\"font-size:${size}${unit};\">${value}</span>`;\r\n\r\n\t\tinput = input.replace(proto, output);\r\n\t}\r\n\r\n\treturn input;\r\n}\r\n\r\nfunction replacePhonetic (input) {\r\n\twhile ((matched = PHONETIC_REGX.exec(input)) !== null) {\r\n\t\tlet [ proto, text, pronunciation ] = matched;\r\n\r\n\t\ttext = replaceInline(text);\r\n\t\tconst output = `<ruby>${text}<rp>（</rp><rt>${pronunciation}</rt><rp>）</rp></ruby>`;\r\n\r\n\t\tinput = input.replace(proto, output);\r\n\t}\r\n\r\n\treturn input;\r\n}\r\n\r\nfunction replaceSupSub(input) {\r\n\twhile((matched = SUP_SUB_REGX.exec(input)) !== null) {\r\n\t\tlet [ proto, mark, value ] = matched;\r\n\r\n\t\tvalue = replaceInline(value);\r\n\t\tmark = MarkMap[mark];\r\n\r\n\t\tconst output = `<${mark}>${value}</${mark}>`;\r\n\r\n\t\tinput = input.replace(proto, output);\r\n\t}\r\n\r\n\treturn input;\r\n}\r\n\r\n// 因为参考的使用属于行内属性，所以就把参考的使用放在这里了\r\nfunction replaceRefUsing(input) {\r\n\twhile((matched = REF_USING_REGX.exec(input)) !== null) {\r\n\t\tconst [ proto, label ] = matched; \r\n\t\tconst count = calcMapCount(label);\r\n\r\n\t\tconst usingRef = `<sup id=\"rs__${count}\"><a href=\"#rv__${count}\">${label}</a></sup>`;\r\n\r\n\t\tinput = input.replace(proto, usingRef);\r\n\t}\r\n\r\n\treturn input;\r\n}\r\n\r\n/**\r\n * 这里的替换在任何位置都是行内属性\r\n * 链接中的文字\r\n * 对齐的文字\r\n */\r\nfunction replaceInline(input) {\r\n\r\n\tif (!input) return input;\r\n\r\n\tinput = input.replace(ITALIC_REGX, ITALIC_STR); // 斜体字\r\n\tinput = input.replace(BOLD_REGX, BOLD_STR); // 粗体字\r\n\tinput = input.replace(DEL_LINE_REGX, DEL_LINE_STR); // 删除线\r\n\tinput = input.replace(INS_LINE_REGX, INS_LINE_STR); // 下划线\r\n\r\n\tinput = replaceColor(input); // 颜色\r\n\tinput = replaceFont(input); // 字号\r\n\tinput = replacePhonetic(input); // 注音\r\n\tinput = replaceSupSub(input); // 上下标\r\n\tinput = replaceRefUsing(input); // 参考（引用）\r\n\r\n\treturn input;\r\n}\r\n\r\nmodule.exports = exports = replaceInline;\r\n\n\n//# sourceURL=webpack://hiton/./src/modules/inline.js?");

/***/ }),

/***/ "./src/modules/list.js":
/*!*****************************!*\
  !*** ./src/modules/list.js ***!
  \*****************************/
/***/ ((module, exports, __webpack_require__) => {

eval("const { aspectBase } = __webpack_require__(/*! ./../lib/utils */ \"./src/lib/utils.js\");\r\nconst aspect = aspectBase(\"list\");\r\n\r\nconst { Char: { Space: { LF } } } = JsConst;\r\nconst UL_REGX = /\\n(\\* [\\s\\S]+\\n)+/,\r\n\tOL_1_REGX = /\\n([0-9]+\\. [\\s\\S]+\\n)+/,\r\n\tOL_A_REGX = /\\n([a-zA-Z]+\\. [\\s\\S]+\\n)+/,\r\n\tUL_SPLIT_REGX = \"\\n\\* \",\r\n\tTYPE_1_SPLIT_REGX = /\\n[0-9]+\\. /g,\r\n\tTYPE_A_SPLIT_REGX = /\\n[a-zA-Z]+\\. /g;\r\n\r\nconst LI_START_TAG = \"<li>\",\r\n\tLI_END_TAG = \"</li>\",\r\n\tUL_START_TAG = \"<ul>\",\r\n\tUL_END_TAG = \"</ul>\",\r\n\tLI_JOIN = \"</li><li>\",\r\n\tOL_1_START_TAG = `<ol type=\"1\">`,\r\n\tOL_A_START_TAG = `<ol type=\"a\">`,\r\n\tOL_END_TAG = \"</ol>\";\r\n\r\nconst LIST_PARSE_REGX = /list~\\d+\\-\\-\\d+/;\r\n\r\nfunction replaceList() {\r\n\r\n\taspect.before = (input) => {\r\n\r\n\t\t// ul\r\n\t\twhile ((matches = input.match(UL_REGX)) !== null) {\r\n\t\t\tlet [ proto ] = matches;\r\n\t\t\tlet text = proto;\r\n\t\t\tconst output = [];\r\n\r\n\t\t\t// 用 \\n* 分割数据\r\n\t\t\ttext.split(UL_SPLIT_REGX).map(part => {\r\n\t\t\t\tif (part && part !== LF) {\r\n\t\t\t\t\t// 分割出来的再进行内部处理\r\n\t\t\t\t\tpart = part.split(LF).map(line => {\r\n\t\t\t\t\t\treturn line.trim();\r\n\t\t\t\t\t});\r\n\t\t\t\t\tpart = part.join(LF) + LF;\r\n\t\t\t\t\tpart = aspect.before(part);\r\n\t\t\t\t\toutput.push(part);\r\n\t\t\t\t}\r\n\t\t\t});\r\n\r\n\t\t\ttext = UL_START_TAG + LI_START_TAG + output.join(LI_JOIN) + LI_END_TAG + UL_END_TAG;\r\n\t\t\tinput = aspect.replace(input, proto, text);\r\n\t\t}\r\n\r\n\t\t// ol 1\r\n\t\twhile ((matches = input.match(OL_1_REGX)) !== null) {\r\n\t\t\tlet [ proto ] = matches;\r\n\t\t\tlet text = proto;\r\n\t\t\tconst output = [];\r\n\r\n\t\t\t// 用 \\n* 分割数据\r\n\t\t\ttext.split(TYPE_1_SPLIT_REGX).map(part => {\r\n\t\t\t\tif (part && part !== LF) {\r\n\t\t\t\t\t// 分割出来的再进行内部处理\r\n\t\t\t\t\tpart = part.split(LF).map(line => {\r\n\t\t\t\t\t\treturn line.trim();\r\n\t\t\t\t\t});\r\n\t\t\t\t\tpart = part.join(LF) + LF;\r\n\t\t\t\t\tpart = aspect.before(part);\r\n\t\t\t\t\toutput.push(part);\r\n\t\t\t\t}\r\n\t\t\t});\r\n\r\n\t\t\ttext = OL_1_START_TAG + LI_START_TAG + output.join(LI_JOIN) + LI_END_TAG + OL_END_TAG;\r\n\t\t\tinput = aspect.replace(input, proto, text);\r\n\t\t}\r\n\r\n\t\t// ol A\r\n\t\twhile ((matches = input.match(OL_A_REGX)) !== null) {\r\n\t\t\tlet [ proto ] = matches;\r\n\t\t\tlet text = proto;\r\n\t\t\tconst output = [];\r\n\r\n\t\t\t// 用 \\n* 分割数据\r\n\t\t\ttext.split(TYPE_A_SPLIT_REGX).map(part => {\r\n\t\t\t\tif (part && part !== LF) {\r\n\t\t\t\t\t// 分割出来的再进行内部处理\r\n\t\t\t\t\tpart = part.split(LF).map(line => {\r\n\t\t\t\t\t\treturn line.trim();\r\n\t\t\t\t\t});\r\n\t\t\t\t\tpart = part.join(LF) + LF;\r\n\t\t\t\t\tpart = aspect.before(part);\r\n\t\t\t\t\toutput.push(part);\r\n\t\t\t\t}\r\n\t\t\t});\r\n\r\n\t\t\ttext = OL_A_START_TAG + LI_START_TAG + output.join(LI_JOIN) + LI_END_TAG + OL_END_TAG;\r\n\t\t\tinput = aspect.replace(input, proto, text);\r\n\t\t}\r\n\r\n\t\treturn input;\r\n\t}\r\n\r\n\t\r\n\t// 因为存在多重列表，所以这里需要多重恢复\r\n\tconst protoAfter = aspect.after;\r\n\taspect.after = (input) => {\r\n\t\twhile (LIST_PARSE_REGX.exec(input) !== null) {\r\n\t\t\tinput = protoAfter(input);\r\n\t\t}\r\n\r\n\t\treturn input;\r\n\t}\r\n\r\n\treturn aspect;\r\n};\r\n\r\nmodule.exports = exports = replaceList;\r\n\n\n//# sourceURL=webpack://hiton/./src/modules/list.js?");

/***/ }),

/***/ "./src/modules/quote.js":
/*!******************************!*\
  !*** ./src/modules/quote.js ***!
  \******************************/
/***/ ((module, exports, __webpack_require__) => {

eval("const { aspectBase } = __webpack_require__(/*! ./../lib/utils */ \"./src/lib/utils.js\");\r\nconst aspect = aspectBase(\"quote\");\r\n\r\nconst { Char: { Parenthe, Space: { LF } } } = JsConst;\r\n\r\nconst MAIN_QUOT_REGX = /(\\n(>(.*)\\n)+)/,\r\n\tNL_RT_ANGLE_GLOBAL_REGX = /\\n>/g;\r\nconst STRING_QUOTE = \"引用\";\r\nconst QUOTE_PARSE_REGX = /quote~\\d+\\-\\-\\d+/;\r\n\r\nfunction replaceQuote() {\r\n\r\n\taspect.before = (input) => {\r\n\t\twhile ((matchded = MAIN_QUOT_REGX.exec(input)) !== null) { // 获取>列表行，从 \\n> 开始 到 >\\n 结束，中间每行都以 > 开头 \\n 结束\r\n\t\t\tlet protoQuotTxt = matchded[0];\r\n\t\t\tlet quotTxt = protoQuotTxt.replace(NL_RT_ANGLE_GLOBAL_REGX, LF); // 去掉每行开头的 >(&gt;)\r\n\t\t\tquotTxt = quotTxt.slice(1); // 去掉第一行的换行符\r\n\t\t\tlet indexNL = quotTxt.indexOf(LF);\r\n\t\r\n\t\t\tlet quotTtlLn = quotTxt.slice(0, indexNL);\r\n\t\t\tlet hasQuotTtl = String.startsWith(quotTtlLn, Parenthe.LEFT) && String.endsWith(quotTtlLn, Parenthe.RIGHT);\r\n\t\r\n\t\t\tlet legend = hasQuotTtl ? quotTtlLn.slice(1, quotTtlLn.length - 1) : STRING_QUOTE;\r\n\t\t\tlet outTxt = hasQuotTtl ? quotTxt.slice(indexNL + 1) : quotTxt;\r\n\t\r\n\t\t\t// 每行的去空格操作\r\n\t\t\toutTxt = outTxt.split(LF).map((txt) => {\r\n\t\t\t\ttxt = txt.trim();\r\n\t\t\t\treturn txt;\r\n\t\t\t});\r\n\t\t\toutTxt = outTxt.join(LF);\r\n\t\r\n\t\t\toutTxt = aspect.before(outTxt); // 递归查找看是否有多重引用\r\n\t\t\tconst quote = `<fieldset><legend>${legend}</legend>${outTxt}</fieldset>`;\r\n\t\t\tinput = aspect.replace(input, protoQuotTxt, quote);\r\n\t\t}\r\n\t\r\n\t\treturn input;\r\n\t}\r\n\r\n\t// 因为存在多重引用，所以这里需要多重恢复\r\n\tconst protoAfter = aspect.after;\r\n\taspect.after = (input) => {\r\n\t\twhile (QUOTE_PARSE_REGX.exec(input) !== null) {\r\n\t\t\tinput = protoAfter(input);\r\n\t\t}\r\n\r\n\t\treturn input;\r\n\t}\r\n\r\n\treturn aspect;\r\n}\r\n\r\nmodule.exports = exports = replaceQuote;\r\n\n\n//# sourceURL=webpack://hiton/./src/modules/quote.js?");

/***/ }),

/***/ "./src/modules/ref-value.js":
/*!**********************************!*\
  !*** ./src/modules/ref-value.js ***!
  \**********************************/
/***/ ((module, exports, __webpack_require__) => {

eval("/**\r\n * 因为参考的引用和值属于两种类型，所以这里分开实现\r\n *\r\n * [^注1] => <a id=\"c-a-1\" href=\"#c-v-1\"><sup>注1</sup></a>\r\n *\r\n * [^注1]: => <div>注1：balaba <a hre=\"#c-a-1\">返回</a></div>\r\n */\r\nconst replaceInline = __webpack_require__(/*! ./inline */ \"./src/modules/inline.js\");\r\nconst { aspectBase, getMappingCount } = __webpack_require__(/*! ./..//lib/utils */ \"./src/lib/utils.js\");\r\nconst aspect = aspectBase(\"reference\");\r\nconst calcMapCount = getMappingCount(\"refrence\");\r\n\r\nconst REF_VALUE_REGX = /\\n\\[\\^(.+)\\]: (.+)\\n/;\r\n\r\nfunction replaceRefValue () {\r\n\r\n\taspect.before = (input) => {\r\n\r\n\t\twhile((matched = REF_VALUE_REGX.exec(input)) !== null) {\r\n\t\t\tlet [ proto, label, text ] = matched; \r\n\t\t\tconst count = calcMapCount(label);\r\n\r\n\t\t\ttext = replaceInline(text);\r\n\t\t\tconst valRef = `<div id=\"rv__${count}\"\"><a href=\"#rs__${count}\">${label}</a>：${text} <a href=\"#rs__${count}\">↰</a></div>`;\r\n\r\n\t\t\tinput = aspect.replace(input, proto, valRef);\r\n\t\t}\r\n\r\n\t\treturn input;\r\n\t}\r\n\r\n\treturn aspect;\r\n}\r\n\r\nmodule.exports = exports = replaceRefValue;\r\n\n\n//# sourceURL=webpack://hiton/./src/modules/ref-value.js?");

/***/ }),

/***/ "./src/modules/src-links.js":
/*!**********************************!*\
  !*** ./src/modules/src-links.js ***!
  \**********************************/
/***/ ((module, exports, __webpack_require__) => {

eval("/**\r\n * [](www.baidu.com) => <a href=\"www.baidu.com\">www.baidu.com</a>\r\n * [百度](www.baidu.com) => <a href=\"www.baidu.com\">百度</a>\r\n * [](www.baidu.com \"百度一下，你就知道\") => <a title=\"百度一下，你就知道\" href=\"www.baidu.com\">www.baidu.com</a>\r\n * [百度](www.baidu.com \"百度一下，你就知道\") => <a title=\"百度一下，你就知道\" href=\"www.baidu.com\">百度</a>\r\n * \r\n * <hzwaygc@gmail.com> => <a href=\"mailto:hzwaygc@gmail.com\">hzwaygc@gmail.com</a>\r\n */\r\nconst replaceInline = __webpack_require__(/*! ./inline */ \"./src/modules/inline.js\");\r\nconst { aspectBase } = __webpack_require__(/*! ./../lib/utils */ \"./src/lib/utils.js\");\r\nconst aspect = aspectBase(\"links\");\r\n\r\nconst LINK_REGX = /\\[((.|\\s)*?)\\]\\(((.|\\s)*?)( \"(.*?)\")*\\)/;\r\nconst MAIL_REGX = /<([a-zA-Z_\\-0-9]+@[a-zA-Z_\\-0-9]+(\\.[a-zA-Z_\\-0-9]+)+)>/;\r\n\r\nconst replaceSrcLinks = () => {\r\n\r\n\taspect.before = (input) => {\r\n\t\twhile ((matched = LINK_REGX.exec(input)) !== null) {\r\n\t\t\tlet [ proto , label, , href, , title ] = matched;\r\n\t\r\n\t\t\tlabel = label ? replaceInline(label) : href;\r\n\t\t\ttitle = title ? `title=${title}` : String.BLANK;\r\n\t\r\n\t\t\tconst link = `<a ${title} href=\"${href}\">${label}</a>`;\r\n\t\t\tinput = aspect.replace(input, proto, link);\r\n\t\t}\r\n\t\r\n\t\twhile ((matched = MAIL_REGX.exec(input)) !== null) {\r\n\t\t\tconst [ proto, href ] = matched;\r\n\t\r\n\t\t\tconst mailto = `<a href=\"mailto:${href}\">${href}</a>`;\r\n\t\t\tinput = aspect.replace(input, proto, mailto);\r\n\t\t}\r\n\t\r\n\t\treturn input;\r\n\t}\r\n\r\n\treturn aspect;\r\n}\r\n\r\nmodule.exports = exports = replaceSrcLinks;\r\n\n\n//# sourceURL=webpack://hiton/./src/modules/src-links.js?");

/***/ }),

/***/ "./src/modules/table.js":
/*!******************************!*\
  !*** ./src/modules/table.js ***!
  \******************************/
/***/ ((module, exports, __webpack_require__) => {

eval("const replaceInline = __webpack_require__(/*! ./inline */ \"./src/modules/inline.js\");\r\nconst { aspectBase, getMappingCount } = __webpack_require__(/*! ./../lib/utils */ \"./src/lib/utils.js\");\r\nconst aspect = aspectBase(\"table\");\r\nconst calcMapCount = getMappingCount(\"table\");\r\n\r\nconst { Char: { Space } } =JsConst;\r\nconst TABLE_REGX = /(\\|(.)+\\|\\n)+/,\r\n\tVERTICAL_BAR = /\\|/g,\r\n\tTABLE_DEFINE_REGX = /@\\{(.+)\\}/,\r\n\tTABLE_CALLING_REGX =/@:\\{(.+)\\}/;\r\nconst TR_JOIN = \"</tr><tr>\",\r\n\tTD_JOIN = \"</td><td>\",\r\n\tTD_START = \"<td>\",\r\n\tTD_END = \"</td>\",\r\n\tTHEAD_START = \"<thead><tr>\",\r\n\tTHEAD_END = \"</tr></thead>\",\r\n\tTBODY_START = \"<tbody><tr>\",\r\n\tTBODY_END = \"</tr></tbody>\",\r\n\tTABLE_START = `<table class=\"hiton-table\">`,\r\n\tTABLE_END = \"</table>\";\r\n\r\n\r\nconst replaceTable = () => {\r\n\r\n\taspect.before = (input) => {\r\n\t\t// 表格\r\n\t\twhile ((matches = input.match(TABLE_REGX)) !== null) {\r\n\t\t\tconst proto = matches[0], output = [];\r\n\t\t\tlet tHead = \"\";\r\n\r\n\t\t\tArray.forEach(proto.split(Space.LF), (index, line) => {\r\n\t\t\t\tif (String.isEmpty(line)) return;\r\n\t\t\t\tline = line.slice(1, line.length - 1); // 去掉最开始和最后的 |\r\n\t\t\t\tline = line.split(VERTICAL_BAR).map(td => {\r\n\t\t\t\t\ttd = td.trim();\r\n\t\t\t\t\ttd = replaceInline(td); // 递归调用\r\n\t\t\t\t\treturn td;\r\n\t\t\t\t});\r\n\t\t\t\tif (index === 0) {\r\n\t\t\t\t\ttHead = THEAD_START + TD_START + line.join(TD_JOIN) + TD_END + THEAD_END;\r\n\t\t\t\t} else if (index === 1) {\r\n\t\t\t\t\t// TODO 表的第二行定义暂时不做处理\r\n\t\t\t\t} else {\r\n\t\t\t\t\toutput.push(TD_START + line.join(TD_JOIN) + TD_END);\r\n\t\t\t\t}\r\n\t\t\t});\r\n\r\n\t\t\tlet table = TABLE_START + tHead + TBODY_START + output.join(TR_JOIN) + TBODY_END + TABLE_END;\r\n\r\n\t\t\tinput = aspect.replace(input, proto, table);\r\n\t\t}\r\n\r\n\t\t// 表格声明\r\n\t\twhile ((matched = TABLE_DEFINE_REGX.exec(input)) !== null) {\r\n\t\t\tconst [ proto, name ] = matched;\r\n\t\t\tconst count = calcMapCount(name);\r\n\r\n\t\t\tconst define = `<div id=\"t__${count}\" class=\"hiton-table-define\">表：${name}</div>`;\r\n\t\t\tinput = aspect.replace(input, proto, define);\r\n\t\t}\r\n\t\t// 表格引用\r\n\t\twhile ((matched = TABLE_CALLING_REGX.exec(input)) !== null) {\r\n\t\t\tconst [ proto, name ] = matched;\r\n\t\t\tconst count = calcMapCount(name);\r\n\r\n\t\t\tconst calling = `<a class=\"hiton-span-bold hiton-span-margin hiton-table-calling\" href=\"#t__${count}\">表：${name}</a>`;\r\n\t\t\tinput = aspect.replace(input, proto, calling);\r\n\t\t}\r\n\r\n\t\treturn input;\r\n\t}\r\n\r\n\treturn aspect;\r\n}\r\n\r\nmodule.exports = exports = replaceTable;\r\n\n\n//# sourceURL=webpack://hiton/./src/modules/table.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;