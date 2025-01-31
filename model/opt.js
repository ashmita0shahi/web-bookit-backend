const mongoose = require("mongoose");

const optSchema = new mongoose.Schema(
    {
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isStaff: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false }, // For email verification
        otp: { type: String }, // Store OTP
        otpExpires: { type: Date }, // OTP expiration time
    },
    { timestamps: true }
);

module.exports = mongoose.model("Otp", optSchema);
