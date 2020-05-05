const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: email => !Joi.validate(email, Joi.string().email()).error,
        msg: "Invalid email format"
      }
    },
    password: {
      type: String,
      required: true
    },
    __v: { type: Number, select: false }
  },
  {
    timestamps: true
  }
);

schema.methods.hashPassword = async function() {
  this.password = await bcrypt.hash(this.password, 10);
};

schema.methods.validatePassword = async function(password) {
  const validatePassword = await bcrypt.compare(password, this.password);
  return validatePassword;
};

const model = mongoose.model("User", schema);

module.exports = model;
