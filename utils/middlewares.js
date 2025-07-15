const ExpressError = require("../utils/ExpressError.js");

// Define a Middleware function which returns true, if the user is authenticated, or else false:
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create or modify a listings or reviews!");
        res.redirect("/login"); 
    }
    else next();
}

// define a Middleware func() to save the URL as a local variable, to which the client send request to:
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
