const express = require("express");
const router = express.Router();

const {
  getAllTeachers,
  addTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  addCourse,
  deleteCourse
} = require("../controllers/teacher");

router.get("/", getAllTeachers);
router.get("/:id", getTeacher);
router.post("/", addTeacher);
router.post("/:id/course/:code", addCourse);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);
router.delete("/:id/course/:code", deleteCourse);

module.exports = router;
