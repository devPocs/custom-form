const express = require("express");
const router = express.Router();
const { checkNewParticipant } = require("./../utils/validator");
const { addParticipant } = require("./../controller/participantController");

router.post("/", checkNewParticipant, addParticipant);
router.get("/participantsByDay");

module.exports = router;
