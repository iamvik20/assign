const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const extractUserIdMiddleware = require("../middlewares/extractUserIdMiddleware");

// Apply extractUserIdMiddleware to all student routes
router.use(extractUserIdMiddleware);

router.get("/courses", studentController.getEnrolledCourses);
router.get(
  "/courses/teachers",
  studentController.getTeachersForEnrolledCourses
);

module.exports = router;
