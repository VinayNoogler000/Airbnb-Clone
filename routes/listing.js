const express = require("express");
const router = express.Router();
const { isLoggedIn, isAuthorized, validateModel }= require("../middlewares/index.js");
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync");
const { index, viewListing, filterListing, searchListing, addSampleListing, renderAddForm,  addListing, renderEditForm, updateListing, deleteListing } = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

// Initialize Multer by specifying the destination, where uploaded files will be saved:
const upload = multer({ storage });

// Define Routes to RENDER ALL LISTINGS & CREATING a New Property Listing:
router.route('/')
    .get(wrapAsync(index))
    .post(isLoggedIn, upload.single("listing[image]"), validateModel(listingSchema), wrapAsync(addListing));

// Define a Route to RENDER LISTINGS BASED-ON CATEGORIES OR AFTER FILTERING:
router.get("/filter", wrapAsync(filterListing)); 

// Define a Route to Serve a FORM to CREATE a Property Listing:
router.get("/new", isLoggedIn, renderAddForm);

// Define a Route to Search and Render all the Listings whose location/country matches the user's query:
router.get("/search", wrapAsync(searchListing))

// Define Routes to VIEW, UPDATE, & DELETE a Property Listing:
router.route("/:id")
    .get(wrapAsync(viewListing))
    .put(isLoggedIn, isAuthorized("listing"), upload.single("listing[image]"), validateModel(listingSchema), wrapAsync(updateListing))
    .delete(isLoggedIn, isAuthorized("listing"), wrapAsync(deleteListing));

// Define a Route to Render a Form to EDIT a Property Listing:
router.get("/:id/edit", isLoggedIn, isAuthorized("listing"), wrapAsync(renderEditForm));

// Define a Route to ADD a NEW SAMPLE LISTING (Only For Testing):
// router.get("/sample", wrapAsync(addSampleListing));

module.exports = router;