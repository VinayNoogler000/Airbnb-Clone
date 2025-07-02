const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const Review = require("../models/review");
const { listingSchema, reviewSchema } = require("../schema");
const router = express.Router();

// define a Middleware func() to Validate Listing Data, sent by the client:
const validateModel = (req, res, next) => {
    let error;
    if (req.path === "/listings") { // "listingSchema"
        error = listingSchema.validate(req.body).error;
    } 
    else if (req.path.endsWith("/reviews")) { // "reviewSchema"
        error = reviewSchema.validate(req.body).error;
    }

    if(error) {
        let errMsg = error.details.map((err) => err.message).join(',');
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}

// define a Route to Add a new Test Listing:
router.get("/sample", wrapAsync (async (req, res) => {
    // create a demo document in the Listing collection:
    const demoListing = new Listing({
        title: "Sample Listing",
        description: "This is a sample listing for testing purposes.",
        price: 100,
        location: "New York",
        images: "",
        country: "USA"
    });

    // Save the Demo Listing to the DB
    await demoListing.save();
    res.send("Demo listing created successfully!");
}));

// define a Route to Server All Listings to the client:
router.get("/", wrapAsync( async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
}));

// define a Route to Serve a Form to Create a New Property Listing:
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

// define a Route to Handle the Form Submission for Creating a New Property Listing:
router.post("/", validateModel, wrapAsync( async (req, res) => {

    // create a new property listing object:
    const newListing = new Listing({
        ...req.body.listing, 
        image: {
            filename: !req.body.listing.image ? "" : req.body.listing.title, 
            url: req.body.listing.image
        }
    });

    // Save the New Listing to DB:
    await newListing.save();
    console.log("New Listing Created Successfully!");
    res.redirect("/listings");
}));

// define a Route to View the Property in detail:
router.get("/:id", wrapAsync( async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews", "_id rating comment createdAt");

    if (!listing) {
        throw new ExpressError(404, "Listing Doesn't Exists!");
    }

    res.render("listings/show.ejs", { listing });
}));


// define a Route to Render a Form to Edit a Property Listing:
router.get("/:id/edit", wrapAsync( async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        return res.status(404).send("Listing not found");
    }

    res.render("listings/edit.ejs", { listing });
}));

// define a Route to Handle the Form Submission for Updating a Property Listing:
router.put("/:id", validateModel, wrapAsync( async (req, res) => {
    const { id } = req.params;
    const updatedListing = {
        ...req.body.listing,
        image: {
            filename: req.body.listing.image ? req.body.listing.title : "",
            url: req.body.listing.image,
        }
    };

    await Listing.findByIdAndUpdate(id, updatedListing, {runValidators: true});
    res.redirect(`/listings/${id}`);
}));

// define a Route to Handle the Deletion of a Property Listing:
router.delete("/:id", wrapAsync( async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);

    console.log(`Listing with ID ${id} deleted successfully`);
    res.redirect("/listings");
}));

// define a Route to Add a Review to a Property Listing:
router.post("/:id/reviews", validateModel, wrapAsync( async(req, res) => {
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
    res.redirect(`/listings/${listing._id}`);
}));

// define a Route to Delete a Review from a Property Listing:
router.delete("/:id/reviews/:reviewId", wrapAsync( async (req, res) => {
    const { id: listingId, reviewId } = req.params;
    
    await Listing.findByIdAndUpdate(listingId, { $pull: {reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);

    console.log(`Review with ID ${reviewId} deleted successfully from listing ${listingId}`);
    res.redirect(`/listings/${listingId}`);
}));

module.exports = router;