const niv = require("node-input-validator");
const catchAsync = require("./catchAsync");
const Participants = require("./../model/participantSchema");

exports.checkNewParticipant = (req, res, next) => {
	const validation = new niv.Validator(req.body, {
		name: "required|string",
		email: "required|string",
		phoneNumber: "required|string",
		gender: "required|string",
		educationalStatus: "required|string",
		school: "requiredIf:educationalStatus,student|string",
		region: "requiredIf:educationalStatus,student|string"
	});

	validation.check().then(
		catchAsync(async (matched) => {
			if (!matched) {
				return res.status(400).json({
					status: "fail",
					message: "you have not completed the form."
				});
			} else {
				next();
			}
		})
	);
};
exports.checkEmail = catchAsync(async (req, res, next) => {
	console.log("i don reach here");
	const email = await Participants.findOne({ email: req.body.email });
	if (email) {
		return res
			.status(400)
			.json({ status: "fail", message: "email already exists" });
	}
	next();
});
