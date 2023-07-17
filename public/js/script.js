function displayGenderValue() {
	var ele = document.getElementsByName("gender");

	for (i = 0; i < ele.length; i++) {
		if (ele[i].checked) {
			const gender = ele[i].value;
			return gender;
		}
	}
	return;
}
//1. adding a new user
const register = async (data) => {
	const options = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	};
	const resource = await fetch(
		"http://localhost:8088/app/v1/register_participant",
		options
	)
		.then((response) => {
			console.log(response);
			if (response.status === 400) {
				alert(
					"You have not completed the form or the email already exists or name already exists!"
				);
				location.reload();
			} else if (response.status === 200) {
				alert("User added successfully!");
				location.assign("/register");
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

document
	.querySelector("#register_participant")
	.addEventListener("submit", (e) => {
		e.preventDefault();
		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;
		const phoneNumber = document.getElementById("phoneNumber").value;
		const gender = displayGenderValue();
		const educationalStatus =
			document.getElementById("educationalStatus").value;
		const school = document.getElementById("school").value;
		const level = document.getElementById("level").value;
		const region = document.getElementById("region").value;

		const data = {
			name,
			email,
			phoneNumber,
			gender,
			educationalStatus,
			school,
			level,
			region
		};
		console.log(data);
		register(data);
	});
