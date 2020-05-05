const express = require("express");
const { addUser, getSelf } = require("../controllers/user");
const authGuard = require("../middleware/authGuard");
const validateAuth = require("../middleware/validateAuth");
const router = express.Router();

router.get("/me", authGuard, getSelf);

router.post("/", validateAuth, addUser);

module.exports = router;
