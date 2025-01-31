const crypto = require("crypto");
const User = require("../model/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const { hashPassword, matchPassword } = require("../utils/hashPassword");

// Register User - Step 1: Send OTP
const sendOtp = async (req, res) => {
  const { email } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  // Generate OTP and save to user document
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, otp, otpExpires });
  } else {
    user.otp = otp;
    user.otpExpires = otpExpires;
  }

  await user.save();

  // Send OTP via email
  const message = `Your OTP for registration is ${otp}. It will expire in 10 minutes.`;
  await sendEmail(email, "Email Verification OTP", message);

  res.json({ message: "OTP sent to email", email });
};

// Register User - Step 2: Verify OTP and Register
const registerUser = async (req, res) => {
  const { email, fname, lname, password, otp, isStaff } = req.body;

  // Check if user exists and OTP matches
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // Complete Registration
  user.fname = fname;
  user.lname = lname;
  user.password = await hashPassword(password);
  user.isStaff = isStaff || false;
  user.isVerified = true; // Mark email as verified
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(201).json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};

module.exports = { sendOtp, registerUser };
