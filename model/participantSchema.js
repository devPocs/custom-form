const mongoose = require("mongoose");
const ErrorHandler = require("./../utils/ErrorHandler");
const { generateSummitId } = require("./../utils/helperFunctions");
const multer = require("multer");
const path = require("path");

const myTrickFunction = (message) => {
	(req, res, next) => {
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
		enum: ["GRADUATE", "STUDENT"]
	},
	school: { type: String },
	level: { type: Number },
	region: { type: String },
	verified: { type: Boolean, default: false },
	summitID: { type: String, unique: true },
	file: fileSchema,
	createdAt: { type: Date, default: new Date() }
});

participantSchema.pre("save", function (next) {
	//generate new id
	const newId = generateSummitId(6);
	this.summitID = newId;
	return next();
});
const Participant = mongoose.model("participants", participantSchema);

module.exports = Participant;

//participant schema-- add a new field verified, set to default value of false. once verified this value changes to true.
//
