// Define a Middleware function which returns true, if the user is authenticated, or else false:
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticate()) {
        req.flash("error", "You must be logged in to create a new listing!");
        res.redirect("/login"); 
    }
    else {
        next();
    }
}