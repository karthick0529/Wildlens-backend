// server.js
const mongoose = require("mongoose");
const config = require('./utils/config');
const app = require('./app');

console.log("Connecting to MongoDb...");

mongoose.connect(config.MongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected To MongoDB...");
        app.listen(config.PORT, () => {
            console.log(`Server running on Port ${config.PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB...", error.message);
    });
