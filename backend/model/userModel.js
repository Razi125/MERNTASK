const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxlength: [30, "Name cannot exceed 30 characters "],
    minlength: [4, "Name should have more than 4 characters "],
  },
  fatherName: {
    type: String,
    required: [true, "Please Enter Your Father Name"],
    maxlength: [30, "Name cannot exceed 30 characters "],
    minlength: [4, "Name should have more than 4 characters "],
  },
  age: {
    type: Number,
    required: [true, "Please Enter Your Age"],
    maxLength: [3, "Age cannot exceed 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [8, "Password shoud be greater than 8 characters"],
    select: false,
  },
  createdAt: {
     type: Date,
    default: Date.now,
  },

});

// this function using for bcrypting our Password
userSchema.pre("save", async function (next) {
  // this is using for password update only

  if (!this.isModified("password")) {
    // If we want only updating password then this function running
    next();
  }
  // If only want to update name , email then not update password so this function working
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN   --> For creating user access Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
