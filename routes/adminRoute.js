const express = require("express");
const router = express.Router();
const {
  allParticipants,
  getParticipantsByDay,
  verifyParticipant,
  unverified,
  getParticipantsByRegion,
  getParticipantsByEducationalStatus,
  getParticipant,
  getAllVerifiedParticipants,
  getAllUnverifiedParticipants,
} = require("./../controller/adminController");
const { login, logout, protected } = require("./../controller/authController");

router.post("/login", login);
router.post("/logout", logout);
router.get("/all_participants", protected, allParticipants);
router.post("/participants_by_day", protected, getParticipantsByDay);
router.post("/verify_Participant", protected, verifyParticipant);
router.post("/unverify_Participant", protected, unverified);
router.post("/participants_by_region", protected, getParticipantsByRegion);
router.post(
  "/participants_by_educational_status",
  protected,
  getParticipantsByEducationalStatus
);
router.post("/participant", protected, getParticipant);
router.get("/verified_participants", protected, getAllVerifiedParticipants);
router.get("/unverified_participants", protected, getAllUnverifiedParticipants);

module.exports = router;
