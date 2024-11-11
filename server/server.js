const express = require("express");
const path = require("path");
const PORT = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./User.model");
const Url = require("./Url.model");
const shortId = require("shortid");
const nodemailer = require("nodemailer");

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

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

app.get("/getShortPriview", (req, res) => {
  res.send({
    payload: shortId.generate(req.query.url),
  });
});

app.get("/createShortUrl", (req, res) => {
  const short_id = req.query.shortId;
  const shortUrl = `http://localhost:5000/${short_id}`;

  Url.find({ short_id: short_id }).then((response) => {
    if ((response == [] && response[0] == null) || response[0] == undefined) {
      Url.create({
        full_url: req.query.fullUrl,
        short_url: shortUrl,
        user: req.query.user,
        short_id: short_id,
      }).then(() => {
        res.send({
          // payload: `We shrnk this url for you: ${shortUrl}`,
          payload: "acknowledged",
        });
      });
    } else {
      res.send({
        // payload: `We shrnk this url for you: ${shortUrl}`,
        payload: "denied",
      });
    }
  });
});

app.get("/deleteUrl", (req, res) => {
  Url.deleteOne({ short_id: req.query.urlId, user: req.query.user }).then(
    (respon) => {
      res.send({
        payload: "ok",
      });
    }
  );
});

app.get("/createAccount", (req, res) => {
  const user = req.query.user;
  const email = req.query.email;
  const password = req.query.pass;

  User.find({ username: req.query.user }).then((response) => {
    if (response[0] == undefined) {
      User.find({ email: req.query.email }).then((respon) => {
        if (respon[0] == undefined) {
          User.create({
            username: user,
            email: email,
            password: password,
          });

          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: "urlshrnk@gmail.com",
              pass: "tvgkwogoyhhiqlzb",
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

          transporter.sendMail({
            to: email,
            subject: "Confirm your email",
            html: `<h1>Hello, ${user}</h1> <br />
                    <p>This is an automated confirmation email. Please click <a href="http://localhost:5000/confirmEmail?user=${user}">here</a> to confirm your email.</p>`,
          });

          res.send({
            payload: "acknowledged",
          });
        } else {
          res.send({
            payload: "denied",
          });
        }
      });
    } else {
      res.send({
        payload: "denied",
      });
    }
  });
});

app.get("/confirmEmail", (req, res) => {
  User.updateOne(
    { username: req.query.user },
    { $set: { confirmed: true } }
  ).then((respon) => {
    res.sendFile(path.join(__dirname, "page.html"));
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
