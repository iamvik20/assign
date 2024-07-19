const Course = require("../models/course");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

// See their assigned courses
exports.getAssignedCourses = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.userId).populate("courses");
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher.courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// See the students associated with those courses
exports.getStudentsInCourses = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.userId).populate({
      path: "courses",
      populate: {
        path: "students",
        model: "Student",
      },
    });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    const students = teacher.courses.flatMap((course) => course.students);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// See all the students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Assign a course to the student
exports.assignCourseToStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: "Student or Course not found" });
    }

    if (course.students.length >= course.maxStudents) {
      return res.status(400).json({ message: "Course is full" });
    }

    student.courses.push(courseId);
    await student.save();

    res.status(200).json({ message: "Course assigned to student", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove course from the student only
exports.removeCourseFromStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.courses.pull(courseId);
    await student.save();

    res.status(200).json({ message: "Course removed from student", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
