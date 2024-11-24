const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'employee', 'manager', "teamlead"],
    default: 'employee'
  },
  avatar: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  otp: String,
  otpExpiration: Date,
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
