const tryShrnkBtn = document.querySelector(".try-shrnk-btn");
const tryUrlInput = document.querySelector(".try-url-input");
const tryShrnkResult = document.querySelector(".try-shrnk-result");

const user = "caismen";

const staySignedIn = localStorage.getItem("STAY_SIGNED_IN");
if (staySignedIn == "true") {
  location.href = "./accountView.html";
}

tryShrnkBtn.onclick = () => {
  if (tryUrlInput.value != "") {
    fetch(
      `http://localhost:5000/tryShrnk?url=${tryUrlInput.value}&user=${user}`
    ).then((res) => {
      res.json().then((data) => {
        tryUrlInput.value = "";
        tryShrnkResult.textContent = data.payload;
        tryShrnkResult.href = data.payload;
        tryShrnkResult.style.opacity = "1";
      });
    });
  }
  console.log(tryUrlInput.value);
};
