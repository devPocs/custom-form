const crypto = require("crypto");
exports.generateSummitId = function (length) {
	const characters =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	const randomBytes = crypto.randomBytes(length);
	let summitId = "";

	for (let i = 0; i < length; i++) {
		const byte = randomBytes[i] % characters.length;
		summitId += characters.charAt(byte);
	}

	return "NISC-" + summitId;
};
