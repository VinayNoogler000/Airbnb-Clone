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
    initData.listings = initData.listings.map((listing) => ({
        ...listing, 
        owner: "68760116b29e09a8e43edb34"
    }));
    await Listing.insertMany(initData.listings);
}

initDB()
    .then(() => {
        console.log("Database Initialized successfully!");
    })
    .catch((err) => {
        console.error("Error initializing database:", err);
    });