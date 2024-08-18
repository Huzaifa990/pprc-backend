const express = require("express");
const { getAllBlogs, addBlog } = require("../../Controllers/Blogs");

const app = express.Router();

app.get("/", getAllBlogs);
app.post("/", addBlog);

module.exports = app;