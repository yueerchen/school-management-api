const {
  getAllStudent,
  getStudent,
  updateStudent,
  addStudent,
  deleteStudent
} = require("../controllers/student");

const express = require("express");
const router = express.Router();

router.get("/", getAllStudent);
router.get("/:id", getStudent);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
