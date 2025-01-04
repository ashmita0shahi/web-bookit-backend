const jwt = require("jsonwebtoken");
const User = require("../model/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract and verify token
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user from database
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(404).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            console.error("JWT verification failed:", error.message);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

const staff = (req, res, next) => {
    if (req.user && req.user.isStaff) {
        next(); // User is admin, proceed to the next middleware or controller
    } else {
        res.status(403).json({ message: "Access denied, staff only" });
    }
};

module.exports = { protect, staff };