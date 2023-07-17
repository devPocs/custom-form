const niv = require("node-input-validator");

exports.checkNewParticipant = (req, res, next) => {
	const validation = new niv.Validator(req.body, {
		name: "required|string",
		email: "required|string",
		phoneNumber: "required|string",
		gender: "required|string",
		educationalStatus: "required|string",
		school: "requiredIf:educationalStatus,student|string",
		level: "requiredIf:educationalStatus,student|string",
		region: "requiredIf:educationalStatus,student|string"
	});

	validation.check().then(
		catchAsync(async (matched) => {
			if (!matched) {
				return res
					.status(400)
					.json({ status: "fail", error: validation.errors });
			} else {
				next();
			}
		})
	);
};
