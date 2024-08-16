//import the user module
const User = require('../modules/users')
//import the bcrypt library
const bcrypt = require("bcrypt");

//import the jsonwebtoken
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

//define the user Controller
const userController = {
    // define the register method
    register: async (req, res) => {
        try {
            // get the user input from the req body
            const { userName, email,password,photo} = req.body;

            // check the username is already exists   
            const user = await User.findOne({ email });

            // if the user exists, return a error message
            if (user)
                return res.status(400).json({ message: "User is already exists" })

            //hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            //create a new user
            const newUser = new User({
                userName,
                email,
                passwordHash,
                photo
            });

            // save the new user
            const savedUser = await newUser.save();

            //return a success message with saved user
            res.status(200).json({ message: "User created successfully", savedUser });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // define the register method
    login: async (req, res) => {
        try {
            //get the username and password from req body
            const { email } = req.body;

            //check if the user is exits in database
            const user = await User.findOne({ email });

            //if the user does not exists, return a error message
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }

            //if the user exists , compare the password and check if it is correct 
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.passwordHash)

            //if the password is incorrect return a error message
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Incorrect password" })
            }
           
            const {passwordHash,createdAt,updatedAt,__v,...rest} = user._doc;

            /* if the password is correct and generate a token for the 
            user and return it in the res along the success message */
            const token = jwt.sign({
                email : user.email,
                id:user._id,
                userName : user.userName,
            },JWT_SECRET);

            //set a cookie with the token
            // res.cookie('token' , token, {
            //     httpOnly : true,
            //     secure:true,
            //     sameSite : 'none',
            //     expires : new Date (Date.now() +24 * 60 * 60 * 1000) // 24h expiration
            // });

            res.status(200).json({message : "Login successfully" ,token,data:{...rest}});

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    //logout the user
    logout: async(req,res) => {
        try {
            // clear the token cookie
            // res.clearCookie('token',{
                
            //         httpOnly: true,
            //         secure: true,       
            //         sameSite: 'none',
            // });
            
            //return a success message
            res.status(200).json({ message : "logout successfully"});

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}
// export the controller
module.exports = userController;
