const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const { checkOut } = require("./controller/checkOutController");
const viewsRoute = require("./routes/viewsRoute");
const Flutterwave = require("flutterwave-node-v3");

//require middleware routes
const participantRoute = require("./routes/participantRoute");
const adminRoute = require("./routes/adminRoute");
const catchAsync = require("./utils/catchAsync");

const app = express();
dotenv.config({ path: "./config.env" });

const port = app.set("port", process.env.PORT || 4040);
//db connection.
mongoose.connect("mongodb://127.0.0.1:27017/CustomForm");

//set up templating engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//flutterwave stuff
const flw = new Flutterwave(
	"FLWPUBK_TEST-fe3d83f5f2d8826e0c88a7735c790551-X",
	"FLWSECK_TEST-5719b3a6a881bbafb3d8833ac563428c-X"
);

const getBanks = async (req, res, next) => {
	try {
		const payload = {
			country: "NG" //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
		};
		const response = await flw.Bank.country(payload);
		return res.send(response);
		next();
	} catch (error) {
		console.log(error);
	}
};

//middlewares.
app.use(morgan("dev"));
app.use(express.json());

//middleware routes.
app.use("/app/v1/register_participant", participantRoute);
app.use("/app/v1/admin", adminRoute);
app.post("/app/v1/check_out", checkOut);
app.get("/app/v1/banks", getBanks);
app.use("/", viewsRoute);

//unhandled routes.
app.all("*", (req, res, next) => {
	const err = new Error(`Can't find ${req.originalUrl} on this server!`);
	err.errCode = 404;
	err.status = "fail!";

	next(err);
});

//error handler
app.use((err, req, res, next) => {
	const errorMessage = err.message;
	const errorStatus = err.status || "INTERNAL SERVER ERROR";
	const errorCode = err.errCode || 500;
	const stack = err.stack;
	return res
		.status(errorCode)
		.json({ status: errorStatus, message: errorMessage, stack: stack });
});

app.listen(app.get("port"), () => {
	console.log(`Server is running on port ${app.get("port")}!`);
});
