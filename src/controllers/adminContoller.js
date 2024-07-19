const Course = require("../models/course");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const User = require("../models/user");

const adminController = {
  async addStudentToCourse(req, res) {
    try {
      const { courseId, studentId } = req.params;
      const course = await Course.findById(courseId);
      const student = await Student.findById(studentId);

      if (!course || !student) {
        return res.status(404).json({ message: "Course or student not found" });
      }

      if (course.students.length >= course.maxStudents) {
        return res.status(400).json({ message: "Course is full" });
      }

      if (!course.students.includes(studentId)) {
        course.students.push(studentId);
        await course.save();
      }

      if (!student.courses.includes(courseId)) {
        student.courses.push(courseId);
        await student.save();
      }

      res.status(200).json({ message: "Student added to course successfully" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error adding student to course",
          error: error.message,
        });
    }
  },

  async removeStudentFromCourse(req, res) {
    try {
      const { courseId, studentId } = req.params;
      const course = await Course.findById(courseId);
      const student = await Student.findById(studentId);

      if (!course || !student) {
        return res.status(404).json({ message: "Course or student not found" });
      }

      course.students = course.students.filter(
        (id) => id.toString() !== studentId
      );
      await course.save();

      student.courses = student.courses.filter(
        (id) => id.toString() !== courseId
      );
      await student.save();

      res
        .status(200)
        .json({ message: "Student removed from course successfully" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error removing student from course",
          error: error.message,
        });
    }
  },

  async assignCourseToTeacher(req, res) {
    try {
      const { teacherId, courseId } = req.params;
      const teacher = await Teacher.findById(teacherId);
      const course = await Course.findById(courseId);

      if (!teacher || !course) {
        return res.status(404).json({ message: "Teacher or course not found" });
      }

      if (teacher.courses.length >= 5) {
        return res
          .status(400)
          .json({ message: "Teacher cannot teach more than 5 courses" });
      }

      if (!teacher.courses.includes(courseId)) {
        teacher.courses.push(courseId);
        await teacher.save();
      }

      res
        .status(200)
        .json({ message: "Course assigned to teacher successfully" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error assigning course to teacher",
          error: error.message,
        });
    }
  },

  async revokeCourseFromTeacher(req, res) {
    try {
      const { teacherId, courseId } = req.params;
      const teacher = await Teacher.findById(teacherId);

      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      teacher.courses = teacher.courses.filter(
        (id) => id.toString() !== courseId
      );
      await teacher.save();

      res
        .status(200)
        .json({ message: "Course revoked from teacher successfully" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error revoking course from teacher",
          error: error.message,
        });
    }
  },

  async listCourses(req, res) {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching courses", error: error.message });
    }
  },

  async listStudentCourses(req, res) {
    try {
      const { studentId } = req.params;
      const student = await Student.findById(studentId).populate("courses");
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(student.courses);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error fetching student courses",
          error: error.message,
        });
    }
  },

  async listTeacherCourses(req, res) {
    try {
      const { teacherId } = req.params;
      const teacher = await Teacher.findById(teacherId).populate("courses");
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.status(200).json(teacher.courses);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error fetching teacher courses",
          error: error.message,
        });
    }
  },

  async createTeacher(req, res) {
    try {
      const { name, email } = req.body;

      const user = new User({
        name,
        email,
        userType: "teacher",
      });
      await user.save();
      
      const teacher = new Teacher({
        name: user.teacherName,
        user: user._id,
      });
      await teacher.save();

      res
        .status(201)
        .json({ message: "Teacher created successfully", teacher });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating teacher", error: error.message });
    }
  },

  async createStudent(req, res) {
    try {
      const { name, email } = req.body;

      const user = new User({
        name,
        email,
        userType: "student",
      });
      await user.save();

      const student = new Student({
        name,
        user: user._id,
      });
      await student.save();

      res
        .status(201)
        .json({ message: "Student created successfully", student });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating student", error: error.message });
    }
  },
};

module.exports = adminController;
