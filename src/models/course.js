const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    unique: true,
  },
  maxStudents: {
    type: Number,
    required: true,
    max: 30,
    validate: {
      validator: function (v) {
        return v <= 30;
      },
      message: (props) =>
        `${props.value} exceeds the maximum limit of 30 students!`,
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
