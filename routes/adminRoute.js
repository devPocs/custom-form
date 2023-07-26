const express = require("express");
const router = express.Router();
const {
	allParticipants,
	getParticipantsByDay,
	verifyParticipant,
	getParticipantsByRegion,
	getParticipantsByEducationalStatus,
	getParticipant,
	getAllVerifiedParticipants,
	getAllUnverifiedParticipants
} = require("./../controller/adminController");
const { login, logout } = require("./../controller/authController");

router.post("/login", login);
router.get("/logout", logout);
router.get("/all_participants", allParticipants);
router.post("/participants_by_day", getParticipantsByDay);
router.post("/verify_Participant", verifyParticipant);
router.post("/participants_by_region", getParticipantsByRegion);
router.post(
	"/participants_by_educational_status",
	getParticipantsByEducationalStatus
);
router.post("/participant", getParticipant);
router.get("/verified_participants", getAllVerifiedParticipants);
router.get("/unverified_participants", getAllUnverifiedParticipants);

module.exports = router;
