const tryShrnkBtn = document.querySelector(".try-shrnk-btn");
const tryUrlInput = document.querySelector(".try-url-input");

const user = "caismen"

tryShrnkBtn.onclick = () => {
  if (tryUrlInput.value != "") {
    fetch(`http://localhost:5000/tryShrnk?url=${tryUrlInput.value}&user=${user}`).then((res) => {
      res.json().then((data) => {
        console.log(data.payload);
      });
    });
  }
  console.log(tryUrlInput.value);
};
