const {
  getAllStudent,
  getStudent,
  updateStudent,
  addStudent,
  deleteStudent,
  addCourse,
  deleteCourse
} = require("../controllers/student");

const express = require("express");
const router = express.Router();

router.get("/", getAllStudent);
router.get("/:id", getStudent);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/:id/course/:code", addCourse);
router.delete("/:id/course/:code", deleteCourse);

module.exports = router;
