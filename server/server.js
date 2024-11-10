const express = require("express");
const PORT = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./User.model");
const Url = require("./Url.model");
const shortId = require("shortid");

mongoose
  .connect(
    "mongodb+srv://nikolasharapov488:JqV5eLTbywGZ6s9Q@urlshrnkcluster.tqftf.mongodb.net/url_shrnk?retryWrites=true&w=majority&appName=urlShrnkCluster"
  )
  .then(console.log("Connected to mongoDB"));

const app = express();
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/tryShrnk", (req, res) => {
  // Url.find({ user: "caismen" }).then((response) => {
  //   console.log(response);
  // });
  // res.send({
  //   payload: "Hello from the server!",
  // });

  const short_id = shortId.generate(req.query.url);
  const shortUrl = `http://localhost:5000/${short_id}`;

  Url.create({
    full_url: req.query.url,
    short_url: shortUrl,
    user: req.query.user,
    short_id: short_id,
  }).then(() => {
    res.send({
      // payload: `We shrnk this url for you: ${shortUrl}`,
      payload: `${shortUrl}`,
    });
  });
});

app.get("/login", (req, res) => {
  const email = req.query.email;
  const pass = req.query.pass;

  User.findOne({ email: email }).then((response) => {
    if (response != {} && response != null) {
      if (pass == response.password) {
        res.send({
          payload: "passed",
          user: response.username,
        });
      } else {
        res.send({
          payload: "denied",
        });
      }
    } else {
      res.send({
        payload: "denied",
      });
    }
  });
});

app.get("/getUrls", (req, res) => {
  Url.find({ user: req.query.user }).then((response) => {
    res.send({
      urls_array: response,
    });
  });
});

app.get("/:shortUrl", (req, res) => {
  // console.log(req.params.shortUrl);

  if (req.params.shortUrl != null) {
    Url.findOne({ short_id: req.params.shortUrl }).then((response) => {
      if (response != {} && response != null) {
        res.redirect(response.full_url);

        let clickCount = Number(response.clicks);
        clickCount++;
        // console.log(`${clickCount}`);

        Url.updateOne(
          { short_id: req.params.shortUrl },
          { $set: { clicks: `${clickCount}` } }
        ).then((respon) => {});
      } else {
        console.log("There was a problem");
      }
    });
  }
});
