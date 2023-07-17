const express = require("express");
const router = express.Router();
const {
	allParticipants,
	getParticipantsByDay
} = require("./../controller/adminController");

router.get("/allParticipants", allParticipants);
router.post("/see_participantsByDay", getParticipantsByDay);

module.exports = router;
