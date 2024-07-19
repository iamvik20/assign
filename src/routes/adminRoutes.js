const express = require("express");
const adminController = require("../controllers/adminContoller");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Ensure all admin routes are protected
router.use(adminMiddleware);

router.post(
  "/courses/:courseId/students/:studentId",
  adminController.addStudentToCourse
);
router.delete(
  "/courses/:courseId/students/:studentId",
  adminController.removeStudentFromCourse
);

router.post(
  "/teachers/:teacherId/courses/:courseId",
  adminController.assignCourseToTeacher
);
router.delete(
  "/teachers/:teacherId/courses/:courseId",
  adminController.revokeCourseFromTeacher
);

router.get("/courses", adminController.listCourses);
router.get("/students/:studentId/courses", adminController.listStudentCourses);
router.get("/teachers/:teacherId/courses", adminController.listTeacherCourses);

router.post("/teachers", adminController.createTeacher);
router.post("/students", adminController.createStudent);

module.exports = router;
