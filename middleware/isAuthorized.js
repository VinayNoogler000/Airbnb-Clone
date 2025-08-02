const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// define a Middleware to check whether the user is authorized to Update or Delete a Listing/Review or not:
module.exports.isAuthorized = (model) => {
    if(model === "listing") {
        return async (req, res, next) => {
            const {id} = req.params; // listing_id
            const currUser = res.locals.currUser;
            const listing = await Listing.findById(id);
            
            if (!currUser._id.equals(listing.owner._id)) {
                req.flash("error", "Only owner of the property listing can edit or delete it!");
                res.redirect(`/listings/${id}`);
            }
            else next();
        }
    }
    else if (model === "review") {
        return async (req, res, next) => {
            const {id, reviewId} = req.params; // listing_id, review_id
            const currUser = res.locals.currUser;
            const review = await Review.findById(reviewId);
            
            if (!currUser._id.equals(review.author._id)) {
                req.flash("error", "Only author of the review can edit or delete it!");
                res.redirect(`/listings/${id}`);
            }
            else next();
        }
    }
}
