const express = require("express");
const { protected } = require("./../controller/authController");

const router = express.Router();

router.get("/", (req, res) => {
	res.render("index");
});
router.get("/register", (req, res, next) => {
	res.render("register");
});
router.get("/register/successful", (req, res, next) => {
	res.render("success");
});
router.get("/adminPage", protected, (req, res, next) => {
	res.render("adminPage");
});
router.get("/admin/login", (req, res, next) => {
	res.render("login");
});
router.get("/admin/results", (req, res, next) => {
	res.render("results");
});
router.get("/error", (req, res, next) => {
	res.render("error");
});

module.exports = router;
