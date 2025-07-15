const express = require("express");
const router = express.Router();
const { isLoggedIn, isAuthorized, validateModel } = require("../utils/middlewares.js");
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync");
const { index, viewListing, addSampleListing, renderAddForm, addListing, renderEditForm, updateListing, deleteListing } = require("../controllers/listings.js");

// define a Route to Server All Listings to the client:
router.get("/", wrapAsync(index));

// define a Route to VIEW the PROPERTY LISTING IN DETAIL:
router.get("/:id", wrapAsync(viewListing));

// define a Route to ADD a NEW SAMPLE LISTING:
router.get("/sample", wrapAsync(addSampleListing));

// define a Route to Serve a FORM to Create a NEW PROPERTY LISTING:
router.get("/new", isLoggedIn, renderAddForm);

// define a Route to Handle the Form Submission for Creating a New Property Listing:
router.post("/", isLoggedIn, validateModel(listingSchema), wrapAsync(addListing));

// define a Route to Render a Form to EDIT a PROPERTY LISTING:
router.get("/:id/edit", isLoggedIn, isAuthorized("listing"), wrapAsync(renderEditForm));

// define a Route to Handle the Form Submission for UPDATING a PROPERTY LISTING:
router.put("/:id", isLoggedIn, isAuthorized("listing"), validateModel(listingSchema), wrapAsync(updateListing));

// define a Route to Handle the DELETION of a PROPERTY LISTING:
router.delete("/:id", isLoggedIn, isAuthorized("listing"), wrapAsync(deleteListing));

module.exports = router;