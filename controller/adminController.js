const express = require("express");
const mongoose = require("mongoose");
const Participants = require("./../model/participantSchema");
const catchAsync = require("./../utils/catchAsync");
const ErrorHandler = require("./../utils/ErrorHandler");

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

exports.allParticipants = catchAsync(async () => {
	const participants = await Participants.find({});
});

//exports.allParticipants = catchAsync(async (req, res, next) => {
//const participants = await Participants.find({});
//});
