const express = require("express");
const { loginUser } = require("../controllers/auth");
const validateAuth = require("../middleware/validateAuth");
const router = express.Router();

router.post("/", validateAuth, loginUser);

module.exports = router;
