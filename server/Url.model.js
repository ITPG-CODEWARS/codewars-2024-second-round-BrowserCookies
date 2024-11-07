const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema(
  {
    full_url: {
      type: String,
    },
    short_url: {
      type: String,
    },
    short_id: {
      type: String,
    },
    user: {
      type: String,
    },
    clicks: {
      type: String,
      default: "0",
    },
  },
  { collection: "urls" }
);

const Url = mongoose.model("url", UrlSchema);
module.exports = Url;
