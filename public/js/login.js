const emailInput = document.querySelector(".login-email-input");
const passInput = document.querySelector(".login-pass-input");
const staySignedInCheck = document.querySelector(".login-checkbox");
const loginBtn = document.querySelector(".login-btn");

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

function showSuccessMessage(message) {
  var debugDiv = document.createElement("div");
  debugDiv.textContent = message;
  debugDiv.style.position = "fixed";
  debugDiv.style.bottom = "20px";
  debugDiv.style.right = "-130px";
  debugDiv.style.transition = "300ms";
  debugDiv.style.backgroundColor = "#05fa6d";
  //debugDiv.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
  debugDiv.style.padding = "5px 10px";
  debugDiv.style.borderRadius = "5px";
  debugDiv.style.fontSize = "1.5vw";
  debugDiv.style.zIndex = "9999";
  setTimeout(() => {
    debugDiv.style.right = "20px";
    setTimeout(() => {
      debugDiv.style.right = "-130px";
    }, 2750);
  }, 10);
  document.body.appendChild(debugDiv);
  setTimeout(function () {
    debugDiv.remove();
  }, 3000); // Remove the debug message after 3 seconds
}

loginBtn.onclick = () => {
  if (emailInput.value != "" && passInput.value != "") {
    fetch(
      `http://localhost:5000/login?email=${emailInput.value}&pass=${passInput.value}`
    ).then((res) => {
      res.json().then((data) => {
        if (data.payload == "passed") {
          if (staySignedInCheck.checked) {
            localStorage.setItem("STAY_SIGNED_IN", "true");
          } else {
            localStorage.setItem("STAY_SIGNED_IN", "false");
          }
          console.log(data.user);
          localStorage.setItem("URL_SHRNK_USERNAME", data.user);
          location.href = "./accountView.html";
        } else if (data.payload == "denied") {
          emailInput.style.borderColor = "rgba(255, 0, 0, 0.5";
          passInput.style.borderColor = "rgba(255, 0, 0, 0.5";
          showErrorMessage("Something went wrong!");

          emailInput.oninput = () => {
            emailInput.style.borderColor = "grey";
          };

          passInput.oninput = () => {
            passInput.style.borderColor = "grey";
          };
        }
      });
    });
  }
};

window.onkeydown = (e) => {
  if (e.key == "Enter") {
    if (emailInput.value != "" && passInput.value != "") {
      fetch(
        `http://localhost:5000/login?email=${emailInput.value}&pass=${passInput.value}`
      ).then((res) => {
        res.json().then((data) => {
          if (data.payload == "passed") {
            if (staySignedInCheck.checked) {
              localStorage.setItem("STAY_SIGNED_IN", "true");
            } else {
              localStorage.setItem("STAY_SIGNED_IN", "false");
            }
            console.log(data.user);
            localStorage.setItem("URL_SHRNK_USERNAME", data.user);
            location.href = "./accountView.html";
          } else if (data.payload == "denied") {
            emailInput.style.borderColor = "rgba(255, 0, 0, 0.5";
            passInput.style.borderColor = "rgba(255, 0, 0, 0.5";
            showErrorMessage("Something went wrong!");

            emailInput.oninput = () => {
              emailInput.style.borderColor = "grey";
            };

            passInput.oninput = () => {
              passInput.style.borderColor = "grey";
            };
          }
        });
      });
    }
  }
};
