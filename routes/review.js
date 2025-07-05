const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const Review = require("../models/review");
const validateModel = require("../utils/validateModel");
const router = express.Router({ mergeParams: true});

// define a Route to Add a Review to a Property Listing:
router.post("/", validateModel, wrapAsync( async(req, res) => {
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
router.delete("/:reviewId", wrapAsync( async (req, res) => {
    const { id: listingId, reviewId } = req.params;
    
    await Listing.findByIdAndUpdate(listingId, { $pull: {reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted Successfully!");
    console.log(`Review with ID ${reviewId} deleted successfully from listing ${listingId}`);
    res.redirect(`/listings/${listingId}`);
}));

module.exports = router;