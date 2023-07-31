const express = require("express");
const router = express.Router();
const { checkNewParticipant, checkEmail } = require("./../utils/validator");
const { addParticipant } = require("./../controller/participantController");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//// Configure multer to handle file uploads
//const storage = multer.diskStorage({
//	destination: function (req, file, cb) {
//		cb(null, "uploads"); // The 'uploads' folder where files will be saved
//	},
//	filename: function (req, file, cb) {
//		cb(null, Date.now() + "-" + file.originalname);
//	}
//});
//const uploads = multer({ storage: storage });
//
//router.post(
//	"/",
//	uploads.single("file"),
//	checkEmail,
//	checkNewParticipant,
//	addParticipant
//);

//configure cloudinary
const upload = multer({ dest: "uploads/" });
router.post(
	"/",
	upload.single("file"),
	(req, res, next) => {
		// Access the uploaded file via req.file
		const filePath = req.file.path;

		// Upload the file to Cloudinary
		cloudinary.uploader.upload(filePath, (error, result) => {
			if (error) {
				console.error("Error uploading file to Cloudinary:", error);
				res.status(500).json({ error: "Failed to upload file to Cloudinary" });
			} else {
				console.log("File uploaded to Cloudinary:", result);
				next();
			}

			// Remove the temporary file after uploading to Cloudinary
			fs.unlinkSync(filePath);
		});
	},
	checkEmail,
	checkNewParticipant,
	addParticipant
);
module.exports = router;
