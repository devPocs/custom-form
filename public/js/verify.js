const verifyBtns = document.querySelectorAll(".verifyBtns");
verifyBtns.forEach((verifyBtn) => {
	verifyBtn.addEventListener("click", async () => {
		const row = verifyBtn.parentElement.parentElement;
		const email = row.cells[2].innerText;

		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: email })
		};

		await fetch(
			"http://localhost:8088/app/v1/admin/verify_Participant",
			options
		)
			.then((response) => {
				if (response.status === 200) {
					alert("Success");
					location.reload();
				} else if (response.status === 400) {
					alert("Something went wrong!");
					location.reload("");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
});
//the verify button sends an email in the request body and hits the verify route in the backend
//the response returns a status and it is based on the response that was sent that an alert would pop up showing verified. and reload the
//the page.
