const router = require("express").Router();
const { isLoggedIn, saveRedirectUrl, validateModel } = require("../middlewares/index.js");
const passport = require("passport");
const { userSchema } = require("../schema.js");
const { renderSignupForm, registerUser, renderLoginForm, loginUser, logoutUser } = require("../controllers/user.js");

// define a Route to Add a Demo User (Only For Testing):
// router.get("/demo", wrapAsync(addDemoUser));

// define Routes to RENDER a SIGN-UP FORM, & SIGN-UP/REGISTER the User:
router.route("/signup")
    .get(renderSignupForm)
    .post(validateModel(userSchema), registerUser);

// define a Route to Render a LOGIN FORM & LOGIN/AUTHENTICATE USER in the Platform:
router.route("/login")
    .get(renderLoginForm)
    .post(validateModel(userSchema), saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), loginUser);

// define a Route to Logout a User from the Platform:
router.get("/logout", isLoggedIn, logoutUser);

module.exports = router;