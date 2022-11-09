let express = require("express");
let app = express();

app.use("/public", express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
