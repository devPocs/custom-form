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
	//const { originalname, filename, path } = req.file;
	const newParticipant = await Participant.create({
		name: name,
		email: email,
		phoneNumber: phoneNumber,
		gender: gender,
		educationalStatus: educationalStatus,
		school: school,
		level: level,
		region: region
		//file: { originalname, filename, path }
	});
	if (newParticipant) {
		res.status(200).render("success");
	} else {
		res.status(400).render("error");
	}
});
