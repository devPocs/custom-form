const express = require("express");
const mongoose = require("mongoose");
const cookie_parser = require("cookie-parser");
const dotenv = require("dotenv");
//const morgan = require("morgan");
const path = require("path");
const viewsRoute = require("./routes/viewsRoute");
const cloudinary = require("cloudinary").v2;

//require middleware routes
const participantRoute = require("./routes/participantRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: "./config.env" });

const port = app.set("port", process.env.PORT || 4040);

//cloudinary

cloudinary.config({
	cloud_name: "dbg6zbtm4",
	api_key: "649721938535186",
	api_secret: "lgZrOgteHsLtLS41HywQrAI8JY0"
});

//local db connection.
//mongoose.connect("mongodb://127.0.0.1:27017/CustomForm");

//db connection.
mongoose
	.connect(process.env.MONGO_CONN, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Connected to MongoDB Atlas");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB Atlas:", err);
	});

app.disable("x-powered-by");

//set up templating engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

//middlewares.
//app.use(morgan("dev"));

app.use(cookie_parser());

//middleware routes.
app.use("/app/v1/register_participant", participantRoute);
app.use("/app/v1/admin", adminRoute);
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
//
//
////db connection.
//const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://pokohufuoma:<password>@cluster0.wue1uam.mongodb.net/?retryWrites=true&w=majority";
//// Create a MongoClient with a MongoClientOptions object to set the Stable API version
//const client = new MongoClient(uri, {
//  serverApi: {
//    version: ServerApiVersion.v1,
//    strict: true,
//    deprecationErrors: true,
//  }
//});
//async function run() {
//  try {
//    // Connect the client to the server	(optional starting in v4.7)
//    await client.connect();
//    // Send a ping to confirm a successful connection
//    await client.db("admin").command({ ping: 1 });
//    console.log("Pinged your deployment. You successfully connected to MongoDB!");
//  } finally {
//    // Ensures that the client will close when you finish/error
//    await client.close();
//  }
//}
//run().catch(console.dir);
