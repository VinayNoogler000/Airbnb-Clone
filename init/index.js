const mongoose = require('mongoose');
const Listing = require("../models/listing");
const initData = require("./data");

const main = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

main()
    .then(() => console.log("Successfully Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));


const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
}

initDB()
    .then(() => {
        console.log("Database Initialized successfully!");
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Error initializing database:", err);
        mongoose.connection.close();
    });