const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studendRoutes = require('./routes/studentRoutes');
require('dotenv').config();


const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Auth routes
app.use("/auth", authRoutes);

// Admin routes
app.use("/admin", adminRoutes);

// Teacher routes
app.use("/teacher", teacherRoutes);

// Student routes
app.use("/student", studendRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
