const emailInput = document.querySelector(".login-email-input");
const passInput = document.querySelector(".login-pass-input");
const staySignedInCheck = document.querySelector(".login-checkbox");
const loginBtn = document.querySelector(".login-btn");

loginBtn.onclick = () => {
  if (emailInput.value != "" && passInput.value != "") {
    fetch(
      `http://localhost:5000/login?email=${emailInput.value}&pass=${passInput.value}`
    ).then((res) => {
      res.json().then((data) => {
        console.log(data.payload);
      });
    });
  }
};
