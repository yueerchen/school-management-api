const express = require("express");
const router = express.Router();
const studentRoute = require("./routes/student");
const courseRoute = require("./routes/course");

router.use("/student", studentRoute);
router.use("/course", courseRoute);

module.exports = router;
