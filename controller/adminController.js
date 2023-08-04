const express = require("express");
const mongoose = require("mongoose");
const Participants = require("./../model/participantSchema");
const catchAsync = require("./../utils/catchAsync");
const ErrorHandler = require("./../utils/ErrorHandler");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const {
	sanitizeEmail,
	sanitizeTextInput
} = require("./../utils/helperFunctions");

//setup the nodemailer options. take this to the config file later.
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "reg.nisgssouthsouth@gmail.com",
		pass: "aejyropmzsizoewr"
	}
});

exports.allParticipants = catchAsync(async (req, res, next) => {
	const participants = await Participants.find({}).sort({ name: 1 });
	if (participants.length === 0) {
		return res.status(200).render("results", { data: "0 results" });
	}
	if (participants.leghth !== 0) {
		return res.status(200).render("results", { data: participants });
	} else {
		return res.render("error", { data: "something went wrong" });
	}
});

exports.getParticipantsByDay = catchAsync(async (req, res, next) => {
	const startDateString = req.body.startDate;
	const endDateString = req.body.endDate;

	const stats = await Participants.aggregate([
		{
			$match: {
				createdAt: {
					$gte: {
						$dateFromString: {
							dateString: startDateString
						}
					},
					$lte: {
						$dateFromString: {
							dateString: endDateString
						}
					}
				}
			}
		},
		{
			$group: {
				numParticipants: { $sum: 1 },
				_id: "$educationalStatus",
				documents: { $push: "$$ROOT" }
			}
		}
	]);
	res.status(200).json({ status: "success", stats });
});

exports.verifyParticipant = catchAsync(async (req, res, next) => {
	const email = req.body.email;
	const verified = await Participants.findOneAndUpdate(
		{ email: email },
		{
			verified: true
		},
		{
			new: true
		}
	);
	if (verified) {
		const participant = await Participants.find({ email });
		const name = participant[0].name;
		const summitId = participant[0].summitID;
		const mailOptions = {
			from: "reg.nisgssouthsouth@gmail.com",
			to: email,
			subject: "Surveyor's Conference, 2023",
			text: `<h2>Hello, ${name},</h2> <p>Thank you for registering for the conference.</p> 
			<p>Your registration id is: <h2>${summitId}.</h2> 
			<h3>Pls, be able to provide a printed copy of this info at the validation stand during the conference to get your conference tag.</h3>
			<p>Thanks and warm regards.</p>`,

			html: `<h2>Hello, ${name},</h2> <p>Thank you for registering for the conference.</p> 
			<p>Your registration id is: <h2>${summitId}.</h2> 
			<h3>Pls, be able to provide a printed copy of this info at the validation stand during the conference to get your conference tag.</h3> 
			<p>Thanks and warm regards.</p>`
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.status(500).send("Failed to send email");
			} else {
				res.status(200).json({ message: "Email sent successfully" });
			}
		});
	}
});

//check for participants by region and filter by verified status.
exports.getParticipantsByRegion = catchAsync(async (req, res, next) => {
	let region = req.body.region;
	region = sanitizeTextInput(region);

	const chkRegion = await Participants.find({ region: region }).sort({
		name: 1
	});

	if (chkRegion.length === 0) {
		return res.status(200).render("results", { data: "0 results" });
	}
	if (chkRegion.length !== 0) {
		return res.status(200).render("results", { data: chkRegion });
	} else {
		return res.status(404).render("error", { data: "something went wrong" });
	}
});

//check for participants by educational status and verified status
exports.getParticipantsByEducationalStatus = catchAsync(
	async (req, res, next) => {
		let educationalStatus = req.body.educationalStatus;
		educationalStatus = sanitizeTextInput(educationalStatus);
		const status = await Participants.find({
			educationalStatus
		}).sort({ name: 1 });
		if (status.length === 0) {
			return res.status(200).render("results", { data: "0 results" });
		}
		if (status.length !== 0) {
			return res.status(200).render("results", { data: status });
		} else {
			return res.status(404).render("error", { data: "something went wrong" });

			next();
		}
	}
);
//get all verified participants
exports.getAllVerifiedParticipants = catchAsync(async (req, res, next) => {
	const allVerifiedParticipants = await Participants.find({
		verified: true
	}).sort({ name: 1 });
	if (allVerifiedParticipants.length === 0) {
		return res.status(200).render("results", { data: "0 results" });
	}
	if (allVerifiedParticipants.leghth !== 0) {
		return res.status(200).render("results", { data: allVerifiedParticipants });
		next();
	} else {
		return res.status(400).render("error", { data: "something went wrong!" });
	}
});
//get all unverified participants
exports.getAllUnverifiedParticipants = catchAsync(async (req, res, next) => {
	const allUnverifiedParticipants = await Participants.find({
		verified: false
	}).sort({ name: 1 });
	if (allUnverifiedParticipants.length !== 0) {
		return res
			.status(200)
			.render("results", { data: allUnverifiedParticipants });
		next();
	}
	if (allUnverifiedParticipants.length === 0) {
		return res.status(200).render("results", { data: "0 results" });
		next();
	} else {
		res.status(404).render("error", { data: "something wrong happened!" });
	}
});
//get participant by name or email.
exports.getParticipant = catchAsync(async (req, res, next) => {
	const queryString = req.body.queryString;
	const participant = await Participants.find({
		name: sanitizeTextInput(queryString)
	}).sort({ name: 1 });
	if (participant.length === 0) {
		return res.status(200).render("results", { data: "0 results" });
	}
	if (participant.length !== 0) {
		return res.status(200).render("results", { data: participant });
		next();
	} else {
		return res
			.status(400)
			.render("error", { data: "something went wrong! Check your input." });
	}
});
