const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors")
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    // maxAge: 3600, // Maximum age of the preflight request cache
};
app.use(cors(corsOptions));

// Routes
app.use("/api/users", require("./routes/UserRoute"));
app.use("/api/rooms", require("./routes/RoomRoute"));
app.use("/api/bookings", require("./routes/BookingRoute"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
