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

create a index.js file

        --npm init -y
        --npm install
        --import the mongoose module,
        --Connect to MongoDB using mongoose,
        --to connect mongoose need the MongoDB URI ,
        --the URI will put in the dotenv file to secure the password,
        --import and create the dotenv file ----- npm install dotenv,

then create the utils folder and create the config.js file,
    ---then import the dotenv package,
    ---Create all the necessary configuration variables,
    --using process.env.MONGODB_URI,like this,
    --and export the configuration variables,

then come to the index.js and import the config module,
    --and connect the mongoose and start the server,

to start the port and endpoints in app.js
then create the app.js file 
    ---and import the express js
    --create the express app
    --use the express json midlewares like-- app.use(express.json());
     --export the app module,

then create the Modules folder and create the users.js file,
    --import the mongoose,
    --and Here create the mongoose schemas,
    --and export the mongoose.module,
    --and store like objects key value pair,

then create the Controllers folder and create the usersController.js file,
    --import the user module,   
    --and Here create the usersController like objects key value pair,
    --define the methods 
    --get the user input from the req body,
    --check the username is already exists,
    --if the user exists, return a error message,
    --create a new user ,
    --before that hash the password using bcrypt,
    --to use bcrypt import the bcrypt package,
    --save the new user,
    --return a success message with saved user,    
and export the usersController,

then create the routes folder and create the usersroute.js file,
import the usersController and express js,
    --and create the express Router to create express router require express,
    --define the endpoints,
export the router.

the come to the app.js to define the endpoints 
    --define the endpoints
    --and to define the endpoints reuire the routes and import it,        

