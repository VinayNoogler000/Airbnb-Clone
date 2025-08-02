const express = require("express");
const router = express.Router({ mergeParams: true});
const isLoggedIn = require("../middleware/isLoggedin.js");
const isAuthorized = require("../middleware/isAuthorized.js");
const validateModel = require("../middleware/validateModel.js");
const { reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync");
const { addReview, deleteReview } = require("../controllers/review.js");

// define a Route to Add a Review to a Property Listing:
router.post("/", isLoggedIn, validateModel(reviewSchema), wrapAsync(addReview));

// define a Route to Delete a Review from a Property Listing:
router.delete("/:reviewId", isLoggedIn, isAuthorized("review"), wrapAsync(deleteReview));

module.exports = router;