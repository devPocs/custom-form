const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Participant = require("../model/participantSchema");
const {
	sanitizeEmail,
	sanitizeTextInput
} = require("./../utils/helperFunctions");

exports.addParticipant = catchAsync(async (req, res, next) => {
	let { name, email, phoneNumber, gender, educationalStatus, school, region } =
		req.body;
	const { originalname, filename, path } = req.file;

	const newParticipant = await Participant.create({
		name: sanitizeTextInput(name),
		email: email,
		phoneNumber: phoneNumber,
		gender: gender,
		educationalStatus: sanitizeTextInput(educationalStatus),
		school: sanitizeTextInput(school),
		region: sanitizeTextInput(region),
		file: { originalname, filename, path }
	});
	if (newParticipant) {
		res.status(200).render("success");
	} else {
		res.status(400).render("error", { message: "Something went wrong!" });
	}
});
