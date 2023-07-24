//login the admin
const login = async (username, password) => {
	try {
		const result = await axios({
			method: "POST",
			url: "http://localhost:8088/app/v1/admin/login",
			data: { username, password }
		});
		if ((result.data.status = "success")) {
			alert("logged in successfully");
			window.setTimeout(() => {
				location.assign("/adminPage");
			}, 1500);
		}
	} catch (err) {
		console.log(err.response.data);

		document.write(err.response.data);
	}
};

document.querySelector("#admin_login").addEventListener("submit", (e) => {
	e.preventDefault();
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	login(username, password);
});
