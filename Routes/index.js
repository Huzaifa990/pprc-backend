const express = require("express");
const app = express.Router();
const BLOGS = require("./Blogs");
const AUTH = require("./Auth");
const STUDENTS = require("./Students")

app.get("/", (req, res) => {
  res.send("==================== Welcome to my API ====================");
});

app.use("/blogs/", BLOGS);
app.use("/students/", STUDENTS)
app.use("/auth/", AUTH);

module.exports = app;
