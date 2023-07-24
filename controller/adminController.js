const express = require("express");
const mongoose = require("mongoose");
const Participants = require("./../model/participantSchema");
const catchAsync = require("./../utils/catchAsync");
const ErrorHandler = require("./../utils/ErrorHandler");
const nodemailer = require("nodemailer");

//setup the nodemailer options. take this to the config file later.
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "reg.nisgssouthsouth@gmail.com",
		pass: "aejyropmzsizoewr"
	}
});

exports.allParticipants = catchAsync(async (req, res, next) => {
	const participants = await Participants.find({});
	if (participants.length === 0) {
		return res.status(200).render("results", { data: "0 results" });
	}
	if (participants.leghth !== 0) {
		console.log(participants);

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
			subject: "Surveyor's Conference, 2023.",
			text: `<h2>Hello, ${name},</h2> <p>Thank you for registering for the conference.</p> 
			<p>Your registration id is: <h2>${summitId}.</h2> 
			<h3>Please, ensure to have a printed copy of this page.</h3>
			<p>Thanks and warm regards.</p>`,

			html: `<h2>Hello, ${name},</h2> <p>Thank you for registering for the conference.</p> 
			<p>Your registration id is: <h2>${summitId}.</h2> 
			<h3>Please, ensure to have a printed copy of this page.</h3> 
			<p>Thanks and warm regards.</p>`
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error(error);
				res.status(500).send("Failed to send email");
			} else {
				console.log("Email sent: " + info.response);

				res.send("Email sent successfully");
			}
		});
	}
});

//check for participants by region and filter by verified status.
exports.getParticipantsByRegion = catchAsync(async (req, res, next) => {
	const region = req.body.region;
	const chkRegion = await Participants.find({ region: region });

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
		const educationalStatus = req.body.educationalStatus;
		console.log(educationalStatus);
		const status = await Participants.find({
			educationalStatus
		});
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
	});
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
	});
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
		$or: [{ name: queryString }, { email: queryString }]
	});
	if (participant.length === 0) {
		return res.status(200).render("results", { data: "0 results" });
	}
	if (participant.length !== 0) {
		return res.status(200).render("result", { data: participant });
		next();
	} else {
		return res.status(400).render("error", { data: "something went wrong!" });
	}
});

//users should ensure that the name on the form matches the name of their bank accounts
