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
const validateId = require("../middleware/validateId");

router.get("/", getAllTeachers);
router.get("/:id", validateId, getTeacher);
router.post("/", addTeacher);
router.post("/:id/course/:code", validateId, addCourse);
router.put("/:id", validateId, updateTeacher);
router.delete("/:id", validateId, deleteTeacher);
router.delete("/:id/course/:code", validateId, deleteCourse);

module.exports = router;
