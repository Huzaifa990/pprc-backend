const Students = require("../Model/Students");

const addStudents = (req, res) => {
  try {
    const student = new Students(req.body);
    student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Students.find();
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Students.findById(req.params.id);
    if (!student) return res.status(404).send("No Student");
    res.send(student);
  } catch (error) {
    res.status(500).send(error, "Student not found");
  }
};

const updateStudents = async (req, res) => {
  try {
    const student = await Students.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(student);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Server error", error });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Students.findByIdAndDelete(req.params.id);
    res.status(200).send(student);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
    getAllStudents,
    addStudents,
    updateStudents,
    deleteStudent,
    getStudentById
}
