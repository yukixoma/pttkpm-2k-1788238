const express = require("express");
const app = express();
const path = require("path");
const guest = require("./routes/guest.js");
const emp = require("./routes/emp.js");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.set("views", [
  path.join(__dirname, "view"),
  path.join(__dirname, "view/guest"),
  path.join(__dirname, "view/emp")
]);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", guest);
app.use("/emp", emp);
module.exports = app;
