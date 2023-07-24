const express = require("express");
const Admin = require("./../model/adminSchema");
const catchAsync = require("./../utils/catchAsync");

exports.protected = catchAsync(async (req, res, next) => {
	// Retrieve the user ID from the cookie
	const adminId = req.cookies.adminId;

	if (!adminId) {
		res.redirect("admin/login");
		return;
	}
	// Find the authenticated user by ID

	if (adminId !== Admin[0].id) {
		res.render("error");
	} else {
		res.render("adminPage");
	}
});

exports.login = catchAsync(async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	console.log(req.body);
	if (!username || !password) {
		return res
			.status(401)
			.json({ message: "pls, enter your username and password!" });
	}

	// Find the user by username in the user database

	if (username !== Admin[0].userName || password !== Admin[0].password) {
		res.status(401).send("Invalid credentials");
		return;
	}
	// Compare the provided password with the hashed password stored in the user database
	else {
		// Set the authenticated user's ID in a cookie
		res.cookie("adminId", Admin[0].id, { httpOnly: true });
		res.render("adminPage");
	}
});

exports.logout = (req, res) => {
	res
		.cookie("adminId", "loggedOut", {
			expires: new Date(Date.now() + 10 * 1000),
			httpOnly: true
		})
		.json({ status: "success" });
};
