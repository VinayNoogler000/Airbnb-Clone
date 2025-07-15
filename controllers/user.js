// THIS FILE CONTAINS FUNCTIONS AS ROUTE-HANDLERS TO PERFORM CRUD OPERATIONS IN THE REVIEW MODEL.

const User = require("../models/user.js");

// Function to Add a Demo User (Only For Testing):
const addDemoUser = async (req, res) => {
    const newUser = new User ({
        username: "vinay-tambey",
        email: "vinay@gmail.com"
    });

    let registeredUser = await User.register(newUser, "password");
    res.send(registeredUser);
}

// Function to Render a Sign-Up Form:
const renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

// Function to Sign-Up/Register a User in the DB:
const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const newUser = new User({username, email});
        
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        // Automatic Login the User to the Platform:
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", `Welcome to Wonderlust, @${username}!`);
            res.redirect("/listings");
        });
    }
    catch (err) {
        console.log(err.message);
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

// Function to Render a Login Form:
const renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

// Function to Login a User in the Platform:
const loginUser = (req, res) => { 
    let originalUrl = res.locals.redirectUrl || "/listings";

    if (originalUrl !== "/listings") { 
        // When Client-Request to Add, or Delete a Review:
        if (originalUrl.includes("/reviews")) {
            originalUrl = originalUrl.split("/reviews")[0];
        }
        // When Client-Request to Delete a Listing:
        else if (originalUrl.endsWith("?_method=DELETE")) {
            originalUrl = originalUrl.split("?_method=DELETE")[0];
        }
        // And, when Client-Request to Create or Edit a listing, the `originalUrl` will be same as the paths will be "/listings/new", and "/listings/:id/edit",repectively.
    }

    req.flash("success", `Welcome Back, @${req.body.username}!`);
    res.redirect(originalUrl);
}

// Function to Logout a User from the Platform:
const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if(err) next(err);
        else {
            req.flash("success", "Logged Out Successfully!");
            res.redirect("/listings");
        }
    });
}

module.exports = { addDemoUser, renderSignupForm, registerUser, renderLoginForm, loginUser, logoutUser }
