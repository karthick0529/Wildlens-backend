// import Stripe from 'stripe'; 
//import the booking module
const Booking = require("../modules/bookings");

//import the user module
const User = require('../modules/users');

//import the user module
const TourPackage = require('../modules/tourPackages');

const { STRIPE_SECRET_KEY, CLIENT_SITE_URL } = require("../utils/config");


const stripe = require("stripe")(STRIPE_SECRET_KEY);


//define the booking Controller
const bookingController = {
    // define the createTour method
    getCheckoutSession: async (req, res) => {
        try {

            const tour = await TourPackage.findById(req.params.id);
            const user = await User.findById(req.userId);
        
            const { guestSize, phone, bookAt, fullName , companion} = req.body;
            let companionFee=0;
            if(companion==true) {
              companionFee = 20;
            } 
            const serviceFee = 10;
            const totalAmount = Number(tour.price) * Number(guestSize) + Number(serviceFee) + Number(companionFee);
            
            const session = await stripe.checkout.sessions.create({

                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${CLIENT_SITE_URL}/checkout-success`,
                cancel_url: `${CLIENT_SITE_URL}/tours`,

                // `${req.protocol}://${req.get('host')}/tours/${tour.id}`,
                customer_email: user.email,
                client_reference_id: req.params.id,
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            unit_amount: totalAmount * 100,
                            product_data: {
                                name: tour.name,
                                description: tour.description,
                                
                            }
                        },
                        quantity: 1
                    }

                ],
            })

           
            const newBooking = new Booking({
                userId: req.userId,
                userEmail: user.email,
                tourName: tour.name,
                fullName,
                guestSize, phone, bookAt,
                totalPrice:totalAmount,
                companion,
                session: session.id
            })

            //save the new booking
            await newBooking.save();

            //return a success message with saved user
            res.status(200).json({ message: "Booked successfully", session });

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getUserBookings: async (req, res) => {
        try {
            // get the user id in req params
            const userId = req.userId

            //find the user bookings in database
            const user = await User.findById(userId)

            //if the user does not exists, return a error message
            if (!user) {
                return res.status(400).json({ message: "user not booked" })
            }
            const userBooking = await Booking.find({
                userId: userId
            }).select('-__v -phone')

            //return the success message
            res.status(200).json({ userBooking })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    
    getAllBookings: async (req, res) => {
        try {

            //find the user bookings in database
            const booking = await Booking.find().select("-__v")

            //if the booking does not exists, return a error message
            if (!booking) {
                return res.status(400).json({ message: "Booking not found" })
            }
            //return the success message
            res.status(200).json( {booking} )
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

}

//export the module
module.exports = bookingController;