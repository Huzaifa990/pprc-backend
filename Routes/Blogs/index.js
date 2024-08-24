const express = require("express");
const { getAllBlogs, addBlog, editBlogs, findBlog, deleteBlog } = require("../../Controllers/Blogs");

const app = express.Router();

app.get("/", getAllBlogs);
app.post("/", addBlog);
app.patch("/:id", editBlogs);
app.get("/:id", findBlog);
app.delete("/:id", deleteBlog);
module.exports = app;