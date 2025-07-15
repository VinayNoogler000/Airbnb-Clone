// THIS FILE CONTAINS FUNCTIONS AS ROUTE-HANDLERS TO PERFORM CRUD OPERATIONS IN THE REVIEW MODEL.

const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");

// Function to Add a Review to a Property Listing:
const addReview = async(req, res) => {
    // Create a new review instance
    const newReview = new Review({
        ...req.body.review,
        author: req.user._id
    });

    // Find the listing by ID and push the new review into its reviews array
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        throw new ExpressError(404, "Listing Not Found!");
    }
    listing.reviews.push(newReview._id);

    // Save the updated listing & the new review
    await newReview.save();
    await listing.save();
    console.log("Review Added Successfully!");

    // Redirect to the listing's detail page
    req.flash("success", "Review Added Successfully!");
    res.redirect(`/listings/${listing._id}`);
}

// Function to Delete a Review from the Property Listing:
const deleteReview = async (req, res) => {
    const { id: listingId, reviewId } = req.params;
    
    await Listing.findByIdAndUpdate(listingId, { $pull: {reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);

    console.log(`Review with ID ${reviewId} deleted successfully from listing ${listingId}`);
    req.flash("success", "Review Deleted Successfully!");
    res.redirect(`/listings/${listingId}`);
}

module.exports = { addReview, deleteReview };