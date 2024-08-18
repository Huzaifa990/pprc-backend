const express = require("express");
const app = express.Router();
const BLOGS = require("./Blogs");

app.get("/", (req, res)=> {
    res.send("==================== Welcome to my API ====================");
})

app.use("/blogs/", BLOGS);

module.exports = app;