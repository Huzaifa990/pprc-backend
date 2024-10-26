const express = require("express");
const {
  signupController,
  signinController,
} = require("../../Controllers/Auth");
const app = express();

app.post("/signup", signupController);
app.post("/signup", signinController);

module.exports = app;
