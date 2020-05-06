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
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// same as alias
// schema.virtual("code").get(function() {
//   return this._id;
// });

schema.statics.searchQuery = async function(pagination, sort, search) {
  const { page, pageSize } = pagination;
  return this.find({ _id: { $regex: search, $options: "i" } })
    .sort(sort)
    .skip((page - 1) * pageSize)
    .limit(pageSize);
};

schema.statics.searchQueryCount = async function(search) {
  const count = await this.find({
    _id: { $regex: search, $options: "i" }
  }).countDocuments();
  return count;
};

const model = mongoose.model("Course", schema);

module.exports = model;
