// import all required libraries
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");
const Review = require("./models/review");
const review = require("./models/review");

// define Main() to Connect with MongoDB:
const main = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

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

// Establish Connection with MongoDB:
main()
    .then(() => console.log("Successfully Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Create Express App:
const app = express();
const PORT = process.env.PORT;

// make the Data Readable to Express app, which is Embedded in Client's Request:
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// define the Path from where Static Files will be Served:
app.use(express.static(path.join(__dirname, "/public")));

// set the Template Engine, with its Path:
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views/"));

// Define Route Handlers or APIs:
app.get('/', (req, res) => {
    res.send("Hi, I'm Root!");
});

// define a Route to Add a new Test Listing:
app.get("/testListing", wrapAsync (async (req, res) => {
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
app.get("/listings", wrapAsync( async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
}));

// define a Route to Serve a Form to Create a New Property Listing:
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// define a Route to Handle the Form Submission for Creating a New Property Listing:
app.post("/listings", validateModel, wrapAsync( async (req, res) => {

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
app.get("/listings/:id", wrapAsync( async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews", "_id rating comment createdAt");

    if (!listing) {
        throw new ExpressError(404, "Listing Doesn't Exists!");
    }

    res.render("listings/show.ejs", { listing });
}));


// define a Route to Render a Form to Edit a Property Listing:
app.get("/listings/:id/edit", wrapAsync( async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        return res.status(404).send("Listing not found");
    }

    res.render("listings/edit.ejs", { listing });
}));

// define a Route to Handle the Form Submission for Updating a Property Listing:
app.put("/listings/:id", validateModel, wrapAsync( async (req, res) => {
    const { id } = req.params;
    const updatedListing = {
        ...req.body.listing,
        image: {
            filename: req.body.listing.image ? req.body.listing.title : "",
            url: req.body.listing.image,
        }
    };

    await Listing.findByIdAndUpdate(id, updatedListing);
    res.redirect(`/listings/${id}`);
}));

// define a Route to Handle the Deletion of a Property Listing:
app.delete("/listings/:id", wrapAsync( async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);

    console.log(`Listing with ID ${id} deleted successfully`);
    res.redirect("/listings");
}));

// define a Route to Add a Review to a Property Listing:
app.post("/listings/:id/reviews", validateModel, wrapAsync( async(req, res) => {
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
app.delete("/listings/:id/reviews/:reviewId", wrapAsync( async (req, res) => {
    const { id: listingId, reviewId } = req.params;
    
    await Listing.findByIdAndUpdate(listingId, { $pull: {reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);

    console.log(`Review with ID ${reviewId} deleted successfully from listing ${listingId}`);
    res.redirect(`/listings/${listingId}`);
}));

// define a Route-Handler which handles the Client's Requests to All other Undefined Routes:
app.all("/:random", (req, res) => {
    throw new ExpressError(404, "Page Not Found!");
});

// Error-Handling Middleware:
app.use(( err, req, res, next ) => {
    let {statusCode = 500, message = "Internal Server Error"} = err;
    res.status(statusCode).render("error.ejs", {message});
});

// Make the Server Listen for Client's Request:
app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
});