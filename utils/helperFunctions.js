const crypto = require("crypto");
exports.generateSummitId = function (length) {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	const randomBytes = crypto.randomBytes(length);
	let summitId = "";

	for (let i = 0; i < length; i++) {
		const byte = randomBytes[i] % characters.length;
		summitId += characters.charAt(byte);
	}

	return "NISC-" + summitId;
};

exports.sanitizeEmail = function (input) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (emailRegex.test(input)) {
		return input;
	} else {
		return null;
	}
};
exports.sanitizeTextInput = function (input) {
	const sanitizedInput = input.replace(/[^a-zA-Z]/g, " ");

	const capitalizedInput = sanitizedInput.toUpperCase();
	return capitalizedInput;
};
