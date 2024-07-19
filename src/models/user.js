const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (value) {
        return (
          (typeof value === "string" && value.length > 0) || // New name as string
          mongoose.Types.ObjectId.isValid(value) // Reference to user or teacher
        );
      },
      message: "Name must be a non-empty string or a valid ObjectId",
    },
  },
  userType: {
    type: String,
    required: true,
    enum: ["student", "teacher", "admin"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  refModel: {
    type: String,
    enum: ["User", "Teacher"],
    required: function () {
      return mongoose.Types.ObjectId.isValid(this.name);
    },
  },
});

// Virtual to populate the referenced user or teacher
userSchema.virtual("nameRef", {
  ref: function () {
    return this.refModel;
  },
  localField: "name",
  foreignField: "_id",
  justOne: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
