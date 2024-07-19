const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherContoller");
const teacherMiddleware = require("../middlewares/teacherMiddleware");

// Teacher routes
router.get(
  "/assigned-courses",
  teacherMiddleware,
  teacherController.getAssignedCourses
);
router.get(
  "/students-in-courses",
  teacherMiddleware,
  teacherController.getStudentsInCourses
);
router.get(
  "/all-students",
  teacherMiddleware,
  teacherController.getAllStudents
);
router.post(
  "/assign-course-to-student",
  teacherMiddleware,
  teacherController.assignCourseToStudent
);
router.post(
  "/remove-course-from-student",
  teacherMiddleware,
  teacherController.removeCourseFromStudent
);

module.exports = router;
