let express = require("express");
let app = express();

app.use("/public", express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {
  res.json({ message: "Hello json" });
});

module.exports = app;
