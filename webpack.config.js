var path = require("path");

module.exports = {
	entry: { "hiton": "./src/dns.js" },
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js"
	},
	mode: 'development'
};