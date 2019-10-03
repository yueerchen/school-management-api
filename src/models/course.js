const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      uppercase: true,
      alias: "code"
    },
    name: {
      type: String,
      require: true
    },
    description: {
      type: String,
      default: ""
    },
    __v: {
      type: String,
      select: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// schema.virtual("code").get(function() {
//   return this._id;
// });

const model = mongoose.model("Course", schema);

module.exports = model;
