# Render.com URL :

https://wildlens-backend-cm9t.onrender.com

# API Routes

/api/users - User Routes

    POST    - /register -> to register add new user
    POST    - /login -> to login user
    GET     - /logout -> to logout user

/api/admin - Admin Routes

    GET     - /tours -> to get all the tours 

/api/bookings - Booking Routes

    POST    - /razorpay/order -> to get Razorpay Order
    POST    - /createbooking -> to create a User Booking
    GET     - /user -> to get the User Booking details
    GET     - / -> to get All Bookings created by user 
    POST    - /razorpay/verify -> to verify Razorpay Payment details

/api/reviews - Review Routes

    POST    - /review/:id -> to add a Review by user
    GET     - /:id -> to get the Reviews added by user
    PUT     - /review/:id -> to update a Review by user
    DELETE  - /review/:id -> to delete a Review by user

/api/tours - Tour Routes

    Functions which are done by admin only:

    POST    - / -> to create a Tour
    GET     - / -> to get all the Tours
    PUT     - /:id -> to update a Tour by id
    DELETE  - /:id -> to delete a Tour by id


    Functions which are done by user and admin both:

    GET     - /:id -> to get a Tour by id
    GET     - /search/getTourBySearch -> to get a Tour by search
    GET     - /search/getAvailableTour -> to get a Tour details
    GET     - /search/getTourCount -> to get the count of Tours present

Dependencies Used:

        bcrypt 
        cors
        dotenv
        express
        jsonwebtoken
        mongoose
        morgan
        razorpay
