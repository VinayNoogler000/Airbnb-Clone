const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");

// Define a Middleware function which returns true, if the user is authenticated, or else false:
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create or modify a listings or reviews!");
        res.redirect("/login"); 
    }
    else next();
}

// define a Middleware func() to save the originalURL as a local variable, to which the client sent request to:
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

// define a Middleware factory func() to Validate Model Data, sent by the client:
module.exports.validateModel = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
        const errMsg = error.details.map((err) => err.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        return next();
    }
};

// define a Middlelware to check whether the user is authorized to Update or Delete a Listing/Review or not:
module.exports.isAuthorized = async (req, res, next) => {
    const {id} = req.params; // listing_id
    const currUser = res.locals.currUser;
    const listing = await Listing.findById(id);

    if (!currUser._id.equals(listing.owner._id)) {
        req.flash("error", "You're not allowed to modify this listing!");
        res.redirect(`/listings/${id}`);
    }
    else next();
}
