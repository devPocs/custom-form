const viewReceiptBtns = document.querySelectorAll(".viewReceiptBtns");
viewReceiptBtns.forEach((viewReceiptBtn) => {
	viewReceiptBtn.addEventListener("click", async () => {
		const row = viewReceiptBtn.parentElement.parentElement;
		let receipt = row.cells[8].innerText;
		receipt.replace(/\\/g, "/");

		window.location.href = `http://localhost:8088/${receipt}`;
	});
});
//the verify button sends an email in the request body and hits the verify route in the backend
//the response returns a status and it is based on the response that was sent that an alert would pop up showing verified. and reload the
//the page.
