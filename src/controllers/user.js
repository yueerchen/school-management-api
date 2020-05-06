const User = require("../models/user");
const { generateToken } = require("../utils/jwt");
const { formatResponse } = require("../utils/helper");

async function getSelf(req, res) {
  const user = await User.findById(req.user.id);
  return formatResponse(res, user);
}

async function addUser(req, res) {
  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    return res.status(400).json("User already exist");
  }

  const user = new User({
    username,
    email,
    password
  });
  await user.hashPassword();
  await user.save();
  const token = generateToken(user._id);
  return res.json({ email, username, token });
}

module.exports = {
  addUser,
  getSelf
};
