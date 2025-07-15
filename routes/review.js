const express = require("express");
const Listing = require("../models/listing");
const Review = require("../models/review");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn, validateModel } = require("../utils/middlewares.js");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const router = express.Router({ mergeParams: true});

// define a Route to Add a Review to a Property Listing:
router.post("/", isLoggedIn, validateModel(reviewSchema), wrapAsync( async(req, res) => {
    // Create a new review instance
    const newReview = new Review({
        ...req.body.review,
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

    // Redirect to the listing's detail page
    req.flash("success", "Review Added Successfully!");
    console.log("Review Added Successfully!");
    res.redirect(`/listings/${listing._id}`);
}));

// define a Route to Delete a Review from a Property Listing:
router.delete("/:reviewId", isLoggedIn, wrapAsync( async (req, res) => {
    const { id: listingId, reviewId } = req.params;
    
    await Listing.findByIdAndUpdate(listingId, { $pull: {reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted Successfully!");
    console.log(`Review with ID ${reviewId} deleted successfully from listing ${listingId}`);
    res.redirect(`/listings/${listingId}`);
}));

module.exports = router;