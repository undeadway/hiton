const fs = require("fs");
require("./../src/dns");

const file = fs.readFileSync("./test/input.md", "utf-8");

const instance = HitOn.create({
    heading: "counting-mode",
    image: {
        align: "center",
        calling: "not-use"
    },
    table: {
        calling: "not-use"
    }
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