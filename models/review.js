const { required } = require('joi');
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: { 
        type: Number, 
        min: 1, 
        max: 5, 
        required: true
    },
    comment: { 
        type: String, 
        required: true,
        trim: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

module.exports = mongoose.model("Review", reviewSchema);