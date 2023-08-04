const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Participant = require("../model/participantSchema");
const {
	sanitizeEmail,
	sanitizeTextInput
} = require("./../utils/helperFunctions");

//set up node mailer
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "reg.nisgssouthsouth@gmail.com",
		pass: "aejyropmzsizoewr"
	}
});

exports.addParticipant = catchAsync(async (req, res, next) => {
	const url = req.url;
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
		file: { originalname, filename, path, url }
	});
	if (newParticipant) {
		//send mail to the host
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
				res.status(200).json({ status: "success" });
			}
		});
	} else {
		res.status(400).render("error", { message: "Something went wrong!" });
	}
});
