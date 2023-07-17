const catchAsync = require("../utils/catchAsync");
//const Flutterwave = require("./../utils/Flutterwave");

//const flutterwave = new Flutterwave();
const flutterwave = require("flutterwave-node-v3");
const flw = new flutterwave(
	"FLWPUBK_TEST-fe3d83f5f2d8826e0c88a7735c790551-X",
	"FLWSECK_TEST-5719b3a6a881bbafb3d8833ac563428c-X"
);

exports.checkOut = catchAsync(async (req, res, next) => {
	let data = {
		tx_ref: "example01",
		amount: "300",
		//account_bank: "044",
		//account_number: "0690000037",
		currency: "NGN",
		email: "olufemi@flw.com",
		phone_number: "08165975576",
		fullname: "Flutterwave Developers"
	};

	let response = await flw.Charge.ng(data);
	res.send(response);
});
