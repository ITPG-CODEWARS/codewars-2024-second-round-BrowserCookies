const signinUserInput = document.querySelector(".signin-user-input");
const signinEmailInput = document.querySelector(".signin-email-input");
const signinPassInput = document.querySelector(".signin-pass-input");
const signinBtn = document.querySelector(".signin-btn");

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
        console.log(data.payload);
      });
    });
  }
};
