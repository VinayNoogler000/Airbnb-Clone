require("dotenv").config();
const mongoose = require('mongoose');
const Listing = require("../models/listing");
const initData = require("./data");
const getGeoCoordinates = require("../utils/getGeoCoordinates");

const main = async () => {
    await mongoose.connect(process.env.ATLASDB_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    // Loop to Add "gemoetry" & "owner" propertoies to each listing:
    for(let listing of initData.listings) {
        let geometry = await getGeoCoordinates(listing.location, listing.country);
        listing.geometry = geometry;
        listing.owner = "688b941377084855dfa662cd";
    }

    await Listing.insertMany(initData.listings);
}

main()
    .then(() => console.log("Successfully Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

initDB()
    .then(() => {
        console.log("Database Initialized successfully!");
    })
    .catch((err) => {
        console.error("Error initializing database:", err);
    });