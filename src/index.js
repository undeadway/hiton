require("coralian");

const HitOn = require("./hiton");
const saveAsMHTML = require("./save-as-mhtml/index");

module.exports = exports = () => {
	return {
		parse (file) {
			return HitOn.parse(file);
		},
		saveAsMHTML: saveAsMHTML
	}
};
