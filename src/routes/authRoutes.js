const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Assuming you have a User model

router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
    );

    res.json({ jwt: `Bearer ${token}` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
