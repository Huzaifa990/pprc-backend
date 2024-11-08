const express = require("express");
const { getAllStudents, addStudents, updateStudents, getStudentById, deleteStudent } = require("../../Controllers/Students");

const app = express.Router();


app.get("/", getAllStudents);
app.post("/", addStudents);
app.patch("/:id", updateStudents);
app.get("/:id", getStudentById);
app.delete("/:id", deleteStudent);
module.exports = app;