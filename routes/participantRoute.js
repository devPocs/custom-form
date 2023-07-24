const express = require("express");
const router = express.Router();
const {
	checkNewParticipant,
	checkNameAndEmail
} = require("./../utils/validator");
const { addParticipant } = require("./../controller/participantController");
const multer = require("multer");

// Configure multer to handle file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads"); // The 'uploads' folder where files will be saved
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	}
});
const uploads = multer({ storage: storage });

router.post(
	"/",
	uploads.single("bankStatement"),
	checkNewParticipant,
	addParticipant
);

module.exports = router;
