// THIS FILE CONTAINS FUNCTIONS AS ROUTE-HANDLERS TO PERFORM CRUD OPERATIONS IN THE LISTING MODEL.

const Listing = require("../models/listing");

// Function to Render All Listings on the `index.ejs` page:
const index = async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
};

// Function to Add a Sample Listing:
const addSampleListing = async (req, res) => {
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
}

// Function to Render form for Creating a New Property Listing:
const renderAddForm = (req, res) => {
    res.render("listings/new.ejs");
}

// Function to Add a New Listing to the Database:
const addListing = async (req, res) => {
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
}

// Function to View a Property Listing in Detail:
const viewListing = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews", 
        populate: {
            path: "author"
        }
    }).populate("owner", "_id username email");

    if (!listing) {
        req.flash("error", "Listing which you want to view Doesn't Exists!");
        return res.redirect("/listings");
    }
    else res.render("listings/show.ejs", { listing });
}

// Function to Render a Form to Edit a Listing:
const renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}

// Function to Edit/Update a Listing in the DB:
const updateListing = async (req, res) => {
    const { id } = req.params;
    const updatedListing = {
        ...req.body.listing,
        image: {
            filename: req.body.listing.image ? req.body.listing.title : "",
            url: req.body.listing.image,
        }
    };

    await Listing.findByIdAndUpdate(id, updatedListing, { runValidators: true });
    console.log("Listing Updated Successfully!");
    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
}

// Function to Delete a Listing from DB:
const deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted Successfully!");
    console.log(`Listing with ID ${id} deleted successfully`);
    res.redirect("/listings");
}

module.exports = { index, addSampleListing, renderAddForm, addListing, viewListing, renderEditForm, updateListing, deleteListing };