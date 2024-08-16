const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../modules/users');

const auth = {
    isAuth: async (req, res, next) => {
        try {
            // Get the token from req cookies
            const token = req.headers.token;

            // If the token is not present, return an error message
            if (!token) {
                return res.status(401).json({ message: "Unauthorized: No token provided" });
            }

            // Verify the token
            try {
                const decodedToken = jwt.verify(token, config.JWT_SECRET);
                req.userId = decodedToken.id; // Set userId in request object

                // Call the next middleware
                next();
            } catch (error) {
                res.status(401).json({ message: "Unauthorized: Invalid token" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    isAdmin: async (req, res, next) => {
        try {
            const userId = req.userId;

            // Find the user by ID
            const user = await User.findById(userId);

            // If the user is not found, return an error message
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if the user is an admin
            if (user.role !== "admin") {
                return res.status(403).json({ message: "Forbidden: You are not an admin" });
            }

            // If the user is an admin, call the next middleware
            next();
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

// Export the auth middleware
module.exports = auth;
