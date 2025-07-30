// This file defines the Mongoose schema and model for a listing in a marketplace application.
const mongoose = require('mongoose');
const Review = require('./review');

// Define the schema for a listing
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        enum: ["comfort-rooms", "iconic-city", "mountains", "castles", "pools", "camps", "farms", "arctic", "beaches"]
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be less than 0']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            require: true
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    image: {
        // Default image URL, if no image is provided
        filename: String || "",
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1749259560252-ca132892004f?q=80&w=2772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: v => v === "" ? "https://images.unsplash.com/photo-1749259560252-ca132892004f?q=80&w=2772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v
        },
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Owner is required'],
    }
});

// define a Mongoose Middleware to Delete the Associated Reviews when a Listing is Deleted:
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
        console.log(`Deleted ${listing.reviews.length} reviews associated with the listing: '${listing.title}'`);
    }
});

// Create the model from the schema & export it
module.exports = mongoose.model("Listing", listingSchema);