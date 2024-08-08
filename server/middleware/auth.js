const jwt = require('jsonwebtoken');
const config = require('../utils/config')
const User = require('../modules/users')

const auth = {
    isAuth: async(req, res, next) => {
        try {
            //get the token from req cookies
            const token = req.cookies.token;

            //if the token is not present , return a error message
            if (!token) {
                return res.status(400).json({ message: "Unauthorized" });
            }

            //if the token is present verify the token
            try {
                // jwt.verify(token, config.JWT_SECRET),(err,user)=>{
                //     if(err){
                //         return res.status(400).json({ message: "token is invalid" });
                //     }
                //     req.user = user
                // }

                const decodedToken = jwt.verify(token, config.JWT_SECRET);

                // //get the userId form the decoded Token
                // // attached to the req object
                req.userId = decodedToken.id;

                //call the next middleware
                next();

            } catch (error) {
                res.status(400).json({ message: "invalid token" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    isAdmin : async (req,res, next) => {
        try {
            //get the user id from the req body
            const userId = req.userId;

            //find the user by Id
            const user = await User.findById(userId);

            //if the user is not found then return a error message
            if(!user) {
                return res.status(400).json({ message: "User not found" });
            }
            //check if the user is admin and return the error message
            if(user.role !== "admin") {
                return res.status(400).json({ message: "Forbidden" });
            }
            //if the user is an admin then call the next middleware
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
   
//export the auth middleware
module.exports = auth;