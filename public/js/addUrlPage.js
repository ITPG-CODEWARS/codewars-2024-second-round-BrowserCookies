const backBtn = document.querySelector(".back-btn");
const full_url_input = document.querySelector(".full_url_input");
const custom_url_confirmation_checkbox = document.querySelector(
  ".custom-url-confirmation-checkbox"
);
const short_url_input = document.querySelector(".short_url_input");
const short_url_preview = document.querySelector(".short-url-preview");
const save_btn = document.querySelector(".save-btn");

let customShortUrl;
let custom_url_confirmation = false;
let generatedShortId;

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

backBtn.onclick = () => {
  location.href = "./accountView.html";
};

full_url_input.oninput = () => {
  if (
    full_url_input.value != "" &&
    !full_url_input.value.includes(" ") &&
    !custom_url_confirmation
  ) {
    fetch(
      `http://localhost:5000/getShortPriview?url=${full_url_input.value}`
    ).then((res) => {
      res.json().then((data) => {
        generatedShortId = data.payload;
        short_url_preview.textContent = `http://localhost:5000/${data.payload}`;
      });
    });
  } else {
    short_url_preview.textContent = `http://localhost:5000/`;

    if (custom_url_confirmation) {
      short_url_preview.textContent = `http://localhost:5000/${short_url_input.value}`;
    }
  }
};

custom_url_confirmation_checkbox.onchange = () => {
  custom_url_confirmation = !custom_url_confirmation;
  short_url_input.disabled = !short_url_input.disabled;
  short_url_input.style.scale = "1";
  short_url_input.value = "";
  short_url_preview.textContent = `http://localhost:5000/`;

  if (!custom_url_confirmation) {
    if (generatedShortId != undefined) {
      short_url_preview.textContent = `http://localhost:5000/${generatedShortId}`;
    } else {
      short_url_preview.textContent = `http://localhost:5000/example`;
    }
  }
};

short_url_input.oninput = () => {
  if (!short_url_input.value.includes(" ")) {
    customShortUrl = short_url_input.value;
    short_url_preview.textContent = `http://localhost:5000/${short_url_input.value}`;
  } else {
    showErrorMessage("No whitespaces allowed!");
  }
};

save_btn.onclick = () => {
  if (generatedShortId != undefined) {
    if (!custom_url_confirmation) {
      fetch(
        `http://localhost:5000/createShortUrl?fullUrl=${full_url_input.value}&shortId=${generatedShortId}`
      ).then((res) => {
        res.json().then((data) => {
          console.log(data.payload);
        });
      });
    } else if (custom_url_confirmation) {
      if (customShortUrl != undefined && customShortUrl != "") {
        fetch(
          `http://localhost:5000/createShortUrl?fullUrl=${full_url_input.value}&shortId=${customShortUrl}`
        ).then((res) => {
          res.json().then((data) => {
            console.log(data.payload);
          });
        });
      }
    }
  }
};
