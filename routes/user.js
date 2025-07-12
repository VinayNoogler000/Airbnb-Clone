const router = require("express").Router();
const validateModel = require("../utils/validateModel.js");
const { userSchema } = require("../schema.js");
const User = require("../models/user.js");
const passport = require("passport");
const { isLoggedIn } = require("../utils/isLoggedIn.js");

// router.get("/demo", wrapAsync( async (req, res) => {
//     const newUser = new User ({
//         username: "vinay-tambey",
//         email: "vinay@gmail.com"
//     });

//     let registeredUser = await User.register(newUser, "password");
//     res.send(registeredUser);
// }));

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", validateModel(userSchema), async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const newUser = new User({username, email});
        
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

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
});

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", validateModel(userSchema), 
    passport.authenticate("local", {
        failureRedirect: "/login", 
        failureFlash: true
    }), 
    (req, res) => {
        req.flash("success", `Welcome Back, @${req.body.username}!`);
        res.redirect("/listings");
    }
);

router.get("/logout", isLoggedIn, (req, res, next) => {
    req.logout((err) => {
        if(err) next(err);
        else {
            req.flash("success", "Logged Out Successfully!");
            res.redirect("/listings");
        }
    });
});

module.exports = router;