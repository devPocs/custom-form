const notVerifiedBtns = document.querySelectorAll("notVerifiedBtns");
notVerifiedBtns.forEach((notVerifiedBtn) => {
  notVerifiedBtn.addEventListener("click", async () => {
    const row = notVerifiedBtn.parentElement.parentElement;
    const email = row.cells[2].innerText;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    };

    await fetch(
      "https://nisgssouthsouth.onrender.com/app/v1/admin/unverify_Participant",
      options
    )
      .then((response) => {
        if (response.status === 200) {
          alert("False Verification Mail Sent!");
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
