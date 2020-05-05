const {
  getAllStudent,
  getStudent,
  updateStudent,
  addStudent,
  deleteStudent,
  addCourse,
  deleteCourse
} = require("../controllers/student");
const validateId = require("../middleware/validateId");

const express = require("express");
const router = express.Router();

router.get("/", getAllStudent);
router.get("/:id", validateId, getStudent);
router.post("/", addStudent);
router.put("/:id", validateId, updateStudent);
router.delete("/:id", validateId, deleteStudent);
router.post("/:id/course/:code", validateId, addCourse);
router.delete("/:id/course/:code", validateId, deleteCourse);

module.exports = router;
