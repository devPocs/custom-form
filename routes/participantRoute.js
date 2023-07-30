const express = require("express");
const router = express.Router();
const { checkNewParticipant, checkEmail } = require("./../utils/validator");
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
	uploads.single("file"),
	(req, res, next) => {
		if (
			req.file.mimetype !== "application/jpeg" ||
			req.file.mimetype !== "application/pdf" ||
			req.file.mimetype !== "application/jpg" ||
			req.file.mimetype !== "application/png"
		) {
			return res.status(400).json({
				status: "fail",
				message:
					"file format not supported. Only pdf, jpeg, jpg, png files are supported"
			});
		}
		next();
	},
	checkNewParticipant,
	checkEmail,
	addParticipant
);

module.exports = router;
