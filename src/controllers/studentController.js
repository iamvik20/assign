const Student = require("../models/student");
const Course = require("../models/course");
const Teacher = require("../models/teacher");

exports.getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user.id; // Assuming the user ID is stored in the JWT payload
    const student = await Student.findById(studentId).populate("courses");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ courses: student.courses });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching enrolled courses",
        error: error.message,
      });
  }
};

exports.getTeachersForEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId).populate({
      path: "courses",
      populate: {
        path: "teacher",
        model: "Teacher",
        select: "name email", // Only return the teacher's name and email
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const teachersForCourses = student.courses.map((course) => ({
      course: course.name,
      teacher: course.teacher,
    }));

    res.status(200).json({ teachersForCourses });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching teachers for enrolled courses",
        error: error.message,
      });
  }
};
