const mongoose = require("mongoose");
const ErrorHandler = require("./../utils/ErrorHandler");

const participantSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	//passId: { type: String },
	phoneNumber: { type: String, required: true },
	gender: { type: String, required: true },
	educationalStatus: {
		type: String,
		required: true,
		enum: ["graduate", "student"]
	},
	school: { type: String },
	level: { type: Number },
	region: { type: String },
	createdAt: { type: Date, default: new Date() }
});
participantSchema.pre("validate", async function (next) {
	const checkEmail = await this.constructor.findOne({
		email: this.email
	});

	if (checkEmail) {
		return next(new ErrorHandler("This email already exists!", 400));
	} else return next();
});
participantSchema.pre("validate", async function (next) {
	const checkName = await this.constructor.findOne({
		name: this.name
	});

	if (checkName) {
		return next(new ErrorHandler("This name already exists!", 400));
	} else return next();
});

const Participant = mongoose.model("participants", participantSchema);

module.exports = Participant;
