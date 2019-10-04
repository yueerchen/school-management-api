const Course = require("../models/course");
const Student = require("../models/student");

async function getAllCourse(req, res) {
  const course = await Course.find()
    .populate("students", "firstName lastName")
    .exec();
  return res.json(course);
}

async function addCourse(req, res) {
  const { name, code, description } = req.body;
  const existingCourse = await Course.findById(code).exec();
  if (existingCourse) {
    return res.status(400).json("Duplicate course code");
  }
  const course = new Course({
    _id: code,
    name: name,
    description: description
  });
  await course.save();
  return res.json(course);
}

async function getCourse(req, res) {
  const { id: code } = req.params;
  const course = await Course.findById(code)
    .populate("students", "firstName lastName")
    .exec();
  if (!course) {
    return res.status(404).json("course not found");
  }
  return res.json(course);
}

async function updateCourse(req, res) {
  const { id: code } = req.params;
  const { name, description } = req.body;
  const newCourse = await Course.findByIdAndUpdate(
    code,
    { name, description },
    { new: true }
  ).exec();
  if (!newCourse) {
    return res.status(404).json("course not found");
  }
  return res.json(newCourse);
}

async function deleteCourse(req, res) {
  const { id: code } = req.params;
  const course = await Course.findByIdAndDelete(code).exec();
  if (!course) {
    return res.status(404).json("course not found");
  }
  await Student.updateMany(
    { courses: course._id },
    { $pull: { courses: course._id } }
  );
  return res.sendStatus(200);
}

module.exports = {
  getAllCourse,
  addCourse,
  getCourse,
  updateCourse,
  deleteCourse
};
