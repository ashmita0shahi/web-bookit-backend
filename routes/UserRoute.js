const express = require("express");
const { protect, staff } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploads"); // Import the upload middleware

const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    deleteUser,
    verifyOTP,
    resendOTP
} = require("../controller/UserController");

const router = express.Router();

// General user actions
router.post("/register", upload, registerUser); // Now supports image upload
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);

// staff-only actions (e.g., get all users, delete users)
router.get("/all", protect, staff, getAllUsers);
router.get("/:id", protect, staff, getUserById);
router.delete("/:id", protect, staff, deleteUser);

module.exports = router;
