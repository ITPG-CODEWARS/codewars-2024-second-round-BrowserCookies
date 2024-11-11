const signinUserInput = document.querySelector(".signin-user-input");
const signinEmailInput = document.querySelector(".signin-email-input");
const signinPassInput = document.querySelector(".signin-pass-input");
const signinBtn = document.querySelector(".signin-btn");

function showErrorMessage(message) {
  var debugDiv = document.createElement("div");
  debugDiv.textContent = message;
  debugDiv.style.position = "fixed";
  debugDiv.style.bottom = "20px";
  debugDiv.style.right = "-130px";
  debugDiv.style.opacity = "0";
  debugDiv.style.transition = "300ms";
  debugDiv.style.backgroundColor = "#05fa6d";
  //   debugDiv.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
  debugDiv.style.color = "black";
  debugDiv.style.fontWeight = "bold";
  debugDiv.style.padding = "5px 10px";
  debugDiv.style.borderRadius = "5px";
  debugDiv.style.fontSize = "1.5vw";
  debugDiv.style.zIndex = "9999";
  setTimeout(() => {
    debugDiv.style.right = "20px";
    debugDiv.style.opacity = "1";
    setTimeout(() => {
      debugDiv.style.opacity = "0";
      debugDiv.style.right = "-130px";
    }, 2750);
  }, 10);
  document.body.appendChild(debugDiv);
  setTimeout(function () {
    debugDiv.remove();
  }, 3000); // Remove the debug message after 3 seconds
}

signinBtn.onclick = () => {
  if (
    signinEmailInput.value != "" &&
    signinPassInput.value != "" &&
    signinUserInput.value != ""
  ) {
    const username = signinUserInput.value;
    const email = signinEmailInput.value;
    const password = signinPassInput.value;

    fetch(
      `http://localhost:5000/createAccount?user=${username}&email=${email}&pass=${password}`
    ).then((res) => {
      res.json().then((data) => {
        if (data.payload == "acknowledged") {
          localStorage.setItem("STAY_SIGNED_IN", "true");
          localStorage.setItem("URL_SHRNK_USERNAME", username);
          location.href = "../html/accountView.html";
        } else {
          showErrorMessage("Something went wrong. Please try again.");
        }
      });
    });
  }
};
