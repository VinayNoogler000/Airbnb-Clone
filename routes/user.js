const router = require("express").Router();
const { isLoggedIn, saveRedirectUrl, validateModel } = require("../utils/middlewares.js");
const passport = require("passport");
const { userSchema } = require("../schema.js");
const { renderSignupForm, registerUser, renderLoginForm, loginUser, logoutUser } = require("../controllers/user.js");

// define a Route to Add a Demo User (Only For Testing):
// router.get("/demo", wrapAsync(addDemoUser));

// define a Route to Render a Sign-Up Form:
router.get("/signup", renderSignupForm);

// define a Route to Sign-Up/Register a User in the DB:
router.post("/signup", validateModel(userSchema), registerUser);

// define a Route to Render a Login Form:
router.get("/login", renderLoginForm);

// define a Route to Login a User in the Platform:
router.post("/login", validateModel(userSchema), saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), loginUser);

// define a Route to Logout a User from the Platform:
router.get("/logout", isLoggedIn, logoutUser);

module.exports = router;