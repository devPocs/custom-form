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
		body: data
	};
	await fetch(
		"https://nisgssouthsouth.onrender.com/app/v1/register_participant",
		options
	)
		.then((response) => response.json())
		.then((data) => {
			if (data.status === "fail") alert(data.message);
			else {
				https: location.assign("/register/successful");
			}
		})
		.catch((err) => {});
};

document
	.querySelector("#register_participant")
	.addEventListener("submit", (e) => {
		e.preventDefault();
		const name = document.getElementById("name");
		const email = document.getElementById("email");
		const phoneNumber = document.getElementById("phoneNumber");
		const gender = displayGenderValue();
		const educationalStatus = document.getElementById("educationalStatus");
		const school = document.getElementById("school");
		//const level = document.getElementById("level");
		const region = document.getElementById("region");
		const file = document.getElementById("file");

		const formData = new FormData();
		formData.append("name", name.value);
		formData.append("email", email.value);
		formData.append("phoneNumber", phoneNumber.value);
		formData.append("gender", gender);
		formData.append("educationalStatus", educationalStatus.value);
		formData.append("school", school.value);
		//formData.append("level", level.value);
		formData.append("region", region.value);
		formData.append("file", file.files[0]);

		register(formData);
	});
