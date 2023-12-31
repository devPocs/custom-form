const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Participant = require("../model/participantSchema");
const {
  sanitizeEmail,
  sanitizeTextInput,
} = require("./../utils/helperFunctions");

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
    file: { originalname, filename, path, url },
    createdAt: new Date(),
  });
  if (newParticipant) {
    //send mail to the host
    res.status(200).json({ status: "success" });
  } else {
    res.status(400).render("error", { message: "Something went wrong!" });
  }
});
