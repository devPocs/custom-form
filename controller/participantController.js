const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Participant = require("../model/participantSchema");

exports.addParticipant = catchAsync(async (req, res, next) => {
	const {
		name,
		email,
		phoneNumber,
		gender,
		educationalStatus,
		school,
		level,
		region
	} = req.body;

	const newParticipant = await Participant.create({
		name: name,
		email: email,
		phoneNumber: phoneNumber,
		gender: gender,
		educationalStatus: educationalStatus,
		school: school,
		level: level,
		region: region
	});
	if (newParticipant) {
		return res.status(200).json({
			message: "saved successfully!",
			status: "success",
			newParticipant
		});
	} else {
		res.status(400).json({ message: "unsucessful" });
	}
});
