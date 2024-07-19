const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

teacherSchema.path("courses").validate(function (value) {
  return value.length <= 5;
}, "A teacher cannot teach more than 5 courses.");

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
