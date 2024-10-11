require("coralian");

const fs = require("fs");
const hitOn = require("./../src/index");

const file = fs.readFileSync("./test/input.md", "utf-8");

const instance = hitOn.create({
    heading: "counting-mode",
    image: {
        align: "center"
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