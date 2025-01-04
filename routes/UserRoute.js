const express = require("express");
const { protect, staff } = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    deleteUser,
} = require("../controller/UserController");

const router = express.Router();

// General user actions
router.post("/register", registerUser); // User registration
router.post("/login", loginUser);       // User login

// staff-only actions (e.g., get all users, delete users)
router.get("/all", protect, staff, getAllUsers);       // Get all users (protected)
router.get("/:id", protect, staff, getUserById);   // Get a user by ID (protected)
router.delete("/:id", protect, staff, deleteUser); // Delete a user (protected)

module.exports = router;
