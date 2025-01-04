const express = require('express');
const { protect, staff } = require('../middleware/authMiddleware');
const {
    bookRoom,
    getUserBookings,
    getAllBookings,
    confirmBooking,
} = require('../controller/BookingController');

const router = express.Router();

// User Routes
router.post('/book', protect, bookRoom); // Book a room
router.get('/getbooking', protect, getUserBookings); // Get user's bookings

// Staff Routes
router.get('/all', protect, staff, getAllBookings); // Get all bookings
router.put('/confirm/:id', protect, staff, confirmBooking); // Confirm a booking

module.exports = router;