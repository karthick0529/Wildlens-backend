// Import the User model
const User = require('../modules/users');

// Import the bcrypt library
const bcrypt = require('bcrypt');

// Import jsonwebtoken
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

// Define the user Controller
const userController = {
    // Define the register method
    register: async (req, res) => {
        try {
            // Get the user input from the req body
            const { userName, email, password, photo } = req.body;

            // Check if the user already exists
            const existingUser = await User.findOne({ email });

            // If the user exists, return an error message
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                userName,
                email,
                passwordHash,
                photo,
            });

            // Save the new user
            const savedUser = await newUser.save();

            // Return a success message with the saved user
            res.status(201).json({ message: 'User created successfully', savedUser });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Define the login method
    login: async (req, res) => {
        try {
            // Get the email and password from req body
            const { email, password } = req.body;

            // Check if the user exists in the database
            const user = await User.findOne({ email });

            // If the user does not exist, return an error message
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare the password and check if it is correct
            const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

            // If the password is incorrect, return an error message
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: 'Incorrect password' });
            }

            // Generate a JWT token
            const token = jwt.sign({
                email: user.email,
                id: user._id,
                userName: user.userName,
            }, JWT_SECRET, { expiresIn: '24h' }); // Token expires in 24 hours

            // Return a success message with the token
            const { passwordHash, createdAt, updatedAt, __v, ...rest } = user._doc;
            res.status(200).json({ message: 'Login successful', token, data: { ...rest } });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Logout the user
    logout: (req, res) => {
        try {
            // Return a success message and clear the token from client-side
            res.status(200).json({ message: 'Logout successful', token: null });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

// Export the controller
module.exports = userController;
