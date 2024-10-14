const fs = require("fs");
const hljs = require('highlight.js');

require("./../src/dns");

const file = fs.readFileSync("./test/input.md", "utf-8");

const aspcet = HitOn.createAspect("test", (input) => {
    return input
});

const instance = HitOn.create({
    heading: "counting-mode",
    image: {
        align: "center",
        calling: false
    },
    codes: (code, language) => {
        // 因为不知道各种语法高亮都是如何实现的，所以直接写一个回调函数，让使用者自行实现相关逻辑。
        const output = hljs.highlight(code, {
            language: language
        });

        return output.value;
    },
    plugins: [ aspcet ]
});
const html = instance.parse(file);

const output = `<html>
<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
<link rel="stylesheet" href="./../demo/hiton.css">
</head>
<body>
${html}
</body>
</html>`;

fs.writeFileSync("./test/output.html", output);