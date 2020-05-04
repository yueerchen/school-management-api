const Teacher = require("../models/teacher");
const Course = require("../models/course");

async function getAllTeachers(req, res) {
  const teachers = await Teacher.find()
    .populate("courses", "code name")
    .exec();
  return res.json(teachers);
}

async function addTeacher(req, res) {
  const { firstName, lastName, email } = req.body;
  const teacher = new Teacher({
    firstName,
    lastName,
    email
  });
  await teacher.save();
  return res.json(teacher);
}

async function getTeacher(req, res) {
  const { id } = req.params;
  const teacher = await Teacher.findById(id)
    .populate("courses", "code name")
    .exec();
  if (!teacher) {
    return res.status(404).json("Teacher not found");
  }
  return res.json(teacher);
}

async function updateTeacher(req, res) {
  const { firstName, lastName, email } = req.body;
  const { id } = req.params;
  const updatedTeacher = await Teacher.findByIdAndUpdate(
    id,
    { firstName, lastName, email },
    { new: true }
  ).exec();
  if (!updatedTeacher) {
    return res.status(404).json("Teacher not found");
  }
  return res.json(updatedTeacher);
}

async function deleteTeacher(req, res) {
  const { id } = req.params;
  const teacher = await Teacher.findByIdAndDelete(id).exec();
  if (!teacher) {
    return res.status(404).json("Teacher not found");
  }
  await Course.updateMany(
    { _id: { $in: teacher.courses } },
    { $pull: { teachers: teacher._id } }
  );
  return res.sendStatus(200);
}

async function addCourse(req, res) {
  const { id, code } = req.params;
  const teacher = await Teacher.findById(id);
  const course = await Course.findById(code);

  if (!teacher || !course) {
    return res.status(404).json("teacher or course not found");
  }
  teacher.courses.addToSet(course._id);
  course.teachers.addToSet(teacher._id);
  await course.save();
  await teacher.save();
  return res.json(teacher);
}

async function deleteCourse(req, res) {
  const { id, code } = req.params;
  const teacher = await Teacher.findById(id);
  const course = await Course.findById(code);

  if (!teacher || !course) {
    return res.status(404).json("teacher or course not found");
  }
  const oldCount = teacher.courses.length;
  teacher.courses.pull(course._id);
  course.teachers.pull(teacher._id);
  if (teacher.courses.length === oldCount) {
    return res.status(404).json("Enrolment does not exist");
  }
  await course.save();
  await teacher.save();
  return res.json(teacher);
}

module.exports = {
  getAllTeachers,
  addTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  addCourse,
  deleteCourse
};
