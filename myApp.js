let express = require("express");
require("dotenv").config();
let app = express();

// Middleware example.
app.use("/", function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Configure serving static files.
app.use("/public", express.static("public"));

// Root route sends index.html file.
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Send json. Vary based on .env variables.
app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

// Middlewares can be chained.
app.get(
  "/now",
  function(req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function(req, res) {
    res.json({ time: req.time });
  }
);

// Use route parameters to get specifics about request.
app.get("/:word/echo", function(req, res) {
  res.json({ echo: req.params.word });
});

// Use query strings to get specifics about request.
app.get("/name", function(req, res) {
  res.json({ name: `${req.query.first} ${req.query.last}` });
});

module.exports = app;
