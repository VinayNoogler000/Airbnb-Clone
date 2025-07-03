// import all required libraries:
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");

// Create EXPRESS APP:
const app = express();
const PORT = process.env.PORT;

// ASYNC FUNCTION to CONNECT with MongoDB:
const main = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

// ESTABLISH CONNECTION with MONGODB:
main()
    .then(() => console.log("Successfully Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// PARSE THE DATA EMBEDDED IN REQ'S BODY, and MODIFY THE HTTP-METHOD:
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// define the Path from where STATIC FILES will be Served:
app.use(express.static(path.join(__dirname, "/public")));

// set the TEMPLATE ENGINE, with its Path:
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));

// *********************** Route Handlers/APIs ****************************:
app.get('/', (req, res) => {
    res.redirect("/listings");
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);

// A Route-Handler to Handle the Client's Requests to ALL UNDEFINED ROUTES:
app.use((req, res) => {
    throw new ExpressError(404, "Page Not Found!");
});

// ERROR-HANDLING MIDDLEWARE:
app.use(( err, req, res, next ) => {
    let {statusCode = 500, message = "Internal Server Error"} = err;
    res.status(statusCode).render("error.ejs", {message});
});

// Make the Server Listen for Client's Request:
app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
});