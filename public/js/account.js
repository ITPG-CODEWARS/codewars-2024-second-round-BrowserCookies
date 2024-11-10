const greetingLbl = document.querySelector(".greeting-lbl");
const contentDiv = document.querySelector(".content");
const urlsCountLbl = document.querySelector(".url-count");
const clicksCountLbl = document.querySelector(".clicks-count");
const logoutBtn = document.querySelector(".logout-btn");

if (localStorage.getItem("URL_SHRNK_USERNAME") == null) {
  location.href = "../html/index.html";
}

function showSuccessMessage(message) {
  var debugDiv = document.createElement("div");
  debugDiv.textContent = message;
  debugDiv.style.position = "fixed";
  debugDiv.style.bottom = "20px";
  debugDiv.style.right = "-130px";
  debugDiv.style.transition = "300ms";
  debugDiv.style.backgroundColor = "#05fa6d";
  debugDiv.style.color = "#000000";
  debugDiv.style.fontWeight = "bold";
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

const username = localStorage.getItem("URL_SHRNK_USERNAME");
let urls = [];
fetch(`http://localhost:5000/getUrls?user=${username}`).then((res) => {
  res.json().then((data) => {
    urls = data.urls_array;

    let urls_count = 0;
    let clicks_count = 0;

    urls.forEach((url) => {
      urls_count++;
      clicks_count += Number(url.clicks);

      let full_url_shortened;

      if (url.full_url.length > 23) {
        full_url_shortened = `${url.full_url.slice(0, 23)}...`;
      }

      contentDiv.innerHTML += `
        <article class="url-card">
          <div class="info-div">
            <section>
              full url: <br />
              <span>${full_url_shortened}</span>
            </section>
            <section>
              short url: <br />
              <span
                ><a href="${url.full_url}"
                  >${url.short_id}</a
                ></span
              >
            </section>
          </div>

          <div class="clicks-div">
            <label>clicks:</label>
            <span>${url.clicks}</span>

            <div class="btns-div">
              <label class="copy-link-btn" title="copy link" payload="${url.short_url}"
                ><img src="../pictures/link_icon.svg" alt=""
              /></label>
              <label title="edit"
                ><img src="../pictures/edit_icon.svg" alt=""
              /></label>
              <label title="delete"
                ><img src="../pictures/delete_icon.svg" alt=""
              /></label>
            </div>
          </div>
        </article>
      `;
    });

    urlsCountLbl.textContent = `urls: ${urls_count}`;
    clicksCountLbl.textContent = `clicks: ${clicks_count}`;

    const copyLinkBtns = document.querySelectorAll(".copy-link-btn");

    copyLinkBtns.forEach((btn) => {
      btn.onclick = () => {
        payload = btn.getAttribute("payload");
        console.log(payload);
        navigator.clipboard.writeText(payload);
        showSuccessMessage("Copied to clipboard.");
      };
    });
  });
});

logoutBtn.onclick = () => {
  localStorage.removeItem("URL_SHRNK_USERNAME");
  localStorage.setItem("STAY_SIGNED_IN", "false");

  location.reload();
};

greetingLbl.innerHTML = `Welcome back, <span>${username}</span>`;
