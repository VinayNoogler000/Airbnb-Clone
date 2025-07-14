const express = require("express");
const Listing = require("../models/listing");
const { listingSchema } = require("../schema.js");
const { isLoggedIn } = require("../utils/isLoggedIn.js");
const validateModel = require("../utils/validateModel");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();

// define a Route to Server All Listings to the client:
router.get("/", wrapAsync( async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
}));

// define a Route to ADD a NEW SAMPLE LISTING:
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

// define a Route to Serve a FORM to Create a NEW PROPERTY LISTING:
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

// define a Route to Handle the Form Submission for Creating a New Property Listing:
router.post("/", isLoggedIn, validateModel(listingSchema), wrapAsync( async (req, res) => {
    // create a new property listing object:
    const newListing = new Listing({
        ...req.body.listing, 
        image: {
            filename: !req.body.listing.image ? "" : req.body.listing.title, 
            url: req.body.listing.image
        },
        owner: req.user._id
    });

    // Save the New Listing to DB:
    await newListing.save();
    
    req.flash("success", "New Listing Created Successfully!");
    console.log("New Listing Created Successfully!");
    res.redirect("/listings");
}));

// define a Route to VIEW the PROPERTY LISTING IN DETAIL:
router.get("/:id", wrapAsync( async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews", "_id rating comment createdAt").populate("owner", "_id username email");

    if (!listing) {
        req.flash("error", "Listing which you want to view Doesn't Exists!");
        return res.redirect("/listings");
    }
    else res.render("listings/show.ejs", { listing });
}));


// define a Route to Render a Form to EDIT a PROPERTY LISTING:
router.get("/:id/edit", isLoggedIn, wrapAsync( async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing which you want to edit Doesn't Exists!");
        return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing });
}));

// define a Route to Handle the Form Submission for UPDATING a PROPERTY LISTING:
router.put("/:id", isLoggedIn, validateModel(listingSchema), wrapAsync( async (req, res) => {
    const { id } = req.params;
    const updatedListing = {
        ...req.body.listing,
        image: {
            filename: req.body.listing.image ? req.body.listing.title : "",
            url: req.body.listing.image,
        }
    };

    await Listing.findByIdAndUpdate(id, updatedListing, {runValidators: true});
    req.flash("success", "Listing Updated Successfully!");
    console.log("Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
}));

// define a Route to Handle the DELETION of a PROPERTY LISTING:
router.delete("/:id", isLoggedIn, wrapAsync( async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted Successfully!");
    console.log(`Listing with ID ${id} deleted successfully`);
    res.redirect("/listings");
}));

module.exports = router;