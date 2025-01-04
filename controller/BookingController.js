const Booking = require('../model/Booking');
const Room = require('../model/Room');

// Confirm a Booking (Staff only)
const confirmBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Update booking to confirmed
        booking.confirmed = true;
        await booking.save();

        res.json({ message: 'Booking confirmed successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Failed to confirm booking', error: error.message });
    }
};

// Book a Room (User only)
const bookRoom = async (req, res) => {
    const { roomId, checkIn, checkOut } = req.body;

    try {
        const room = await Room.findById(roomId);
        if (!room || !room.available) {
            return res.status(400).json({ message: 'Room not available' });
        }

        const booking = await Booking.create({
            user: req.user._id,
            room: roomId,
            checkIn,
            checkOut,
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Failed to book room', error: error.message });
    }
};

// Get User's Bookings (User only)
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('room');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
    }
};

// Get All Bookings (Staff only)
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user room');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
    }
};

module.exports = { bookRoom, getUserBookings, getAllBookings, confirmBooking };
