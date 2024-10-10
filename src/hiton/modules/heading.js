const H6_REGX = /###### (.*?)(\n|$)/g,
    H5_REGX = /##### (.*?)(\n|$)/g,
    H4_REGX = /#### (.*?)(\n|$)/g,
    H3_REGX = /### (.*?)(\n|$)/g,
    H2_REGX = /## (.*?)(\n|$)/g,
    H1_REGX = /# (.*?)(\n|$)/g;
const H6_STR = "<h6 class=\"h6\">$1</h6>",
    H5_STR = "<h5 class=\"h5\">$1</h5>",
    H4_STR = "<h4 class=\"h4\">$1</h4>",
    H3_STR = "<h3 class=\"h3\">$1</h3>",
    H2_STR = "<h2 class=\"h2\">$1</h2>",
    H1_STR = "<h1 class=\"h1\">$1</h1>";

function headingReplace () {

    return (input) => {
        input = input.replace(H6_REGX, H6_STR); // 六级标题
        input = input.replace(H5_REGX, H5_STR); // 五级标题
        input = input.replace(H4_REGX, H4_STR); // 四级标题
        input = input.replace(H3_REGX, H3_STR); // 三级标题
        input = input.replace(H2_REGX, H2_STR); // 二级标题
        input = input.replace(H1_REGX, H1_STR); // 一级标题
    
        return input;
    }
}

module.exports = exports = headingReplace;
