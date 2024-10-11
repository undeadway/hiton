const mappings = {};

function calcMappingCount () {
	const mapping = {};
	let counts = 1;

	function calcMapCount(name) {
		let count = mapping[name];
		if (!count) {
			count = mapping[name] = counts++;
		}
		return count;
	}

	return calcMapCount;
}

module.exports = exports = {
	get (name) {
		let method = mappings[name];
		if (!method) {
			method = mappings[name] = calcMappingCount();
		}
		return method;
	}
};