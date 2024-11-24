require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const transporter = require("../middleware/transporter");

// Forgot Password Route
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const otp = crypto.randomInt(1000, 9999).toString();
  user.otp = otp;
  user.otpExpiration = Date.now() + 600000; // 10 minutes in milliseconds
  await user.save();

  userEmail = email;

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: user.email,
    subject: "Password Reset OTP",
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Error sending email" });
    }
    res.status(200).json({ message: "OTP send to email" });
  });
};

// Verify OTP Route
const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  console.log({ otp });
  const user = await User.findOne({
    otp,
    otpExpiration: { $gt: Date.now() },
  });

  console.log({ user });
  if (!user) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  res.status(200).json({ message: "OTP verified" });
};

// Change Password Route
const ChangePassword = async (req, res) => {
  ; 
  const { password, email } = req.body;
  
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  user.password = await bcrypt.hash(password, 10);
  user.otp = undefined;
  user.otpExpiration = undefined;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
};

module.exports = { forgotPassword, verifyOtp, ChangePassword };
