const express = require("express");
const router = express.Router();
const { isLoggedIn, isAuthorized, validateModel } = require("../utils/middlewares.js");
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync");
const { index, viewListing, addSampleListing, renderAddForm, addListing, renderEditForm, updateListing, deleteListing } = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

// Initialize Multer by specifying the destination, where uploaded files will be saved:
const upload = multer({ storage });

// Define Routes to RENDER ALL LISTINGS & CREATING a New Property Listing:
router.route('/')
    .get(wrapAsync(index))
    .post(isLoggedIn, upload.single("listing[image]"), validateModel(listingSchema), wrapAsync(addListing));

// define a Route to Serve a FORM to CREATE a Property Listing:
router.get("/new", isLoggedIn, renderAddForm);

// Define Routes to VIEW, UPDATE, & DELETE a Property Listing:
router.route("/:id")
    .get(wrapAsync(viewListing))
    .put(isLoggedIn, isAuthorized("listing"), validateModel(listingSchema), wrapAsync(updateListing))
    .delete(isLoggedIn, isAuthorized("listing"), wrapAsync(deleteListing));

// define a Route to Render a Form to EDIT a Property Listing:
router.get("/:id/edit", isLoggedIn, isAuthorized("listing"), wrapAsync(renderEditForm));

// define a Route to ADD a NEW SAMPLE LISTING (Only For Testing):
// router.get("/sample", wrapAsync(addSampleListing));

module.exports = router;