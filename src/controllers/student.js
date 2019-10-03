const Student = require("../models/student");

async function addStudent(req, res) {
  const { firstName, lastName, email } = req.body;
  const student = new Student({
    firstName,
    lastName,
    email
  });
  await student.save();
  return res.json(student);
}

async function getStudent(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id).exec();
  if (!student) {
    return res.status(404).json("Student not found");
  }
  return res.json(student);
}

async function getAllStudent(req, res) {
  const students = await Student.find().exec();
  return res.json(students);
}

async function updateStudent(req, res) {
  const { firstName, lastName, email } = req.body;
  const { id } = req.params;
  const newStudent = await Student.findByIdAndUpdate(
    id,
    { firstName, lastName, email },
    { new: true }
  ).exec();
  if (!newStudent) {
    return res.status(404).json("Student not found");
  }
  return res.json(newStudent);
}

async function deleteStudent(req, res) {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    return res.status(404).json("Student not found");
  }
  return res.sendStatus(200);
}

module.exports = {
  addStudent,
  getAllStudent,
  getStudent,
  updateStudent,
  deleteStudent
};
