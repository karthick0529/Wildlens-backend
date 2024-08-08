//import the user module
const User = require('../modules/users')

const TourPackage = require('../modules/tourPackages')

//import the booking module
const Review = require('../modules/reviews');

//define the admin Controller
const adminController = {

    getAllTours : async (req,res) => {
        try {
            //get all users from the Database
            const tours = await TourPackage.find();

            //return the users
            res.status(200).json({tours});

        } catch (error) {
            res.status(500).json({ message: error.message }); 
        }
    },
} 
//export the controller
module.exports = adminController;