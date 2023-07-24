const mongoose = require("mongoose");
const ErrorHandler = require("./../utils/ErrorHandler");
const { generateSummitId } = require("./../utils/helperFunctions");
const multer = require("multer");
const path = require("path");

const myTrickFunction = (message) => {
	(req, res, next) => {
		console.log("test");
		return res.redirect("error", { data: message });
		next();
	};
};
//create a fileSchema for uploaded files.
const fileSchema = new mongoose.Schema({
	originalname: String,
	file: String,
	path: String
});

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
	verified: { type: Boolean, default: false },
	summitID: { type: String, default: generateSummitId(6) },
	file: fileSchema,
	createdAt: { type: Date, default: new Date() }
});
participantSchema.pre("validate", async function (next) {
	const checkEmail = await this.constructor.findOne({
		email: this.email
	});

	if (checkEmail) {
		return myTrickFunction("This mail already exists!");
	} else return next();
});
participantSchema.pre("validate", async function (next) {
	const checkName = await this.constructor.findOne({
		name: this.name
	});

	if (checkName) {
		return myTrickFunction("This Name already exists!");
	} else return next();
});

const Participant = mongoose.model("participants", participantSchema);

module.exports = Participant;

//participant schema-- add a new field verified, set to default value of false. once verified this value changes to true.
//
