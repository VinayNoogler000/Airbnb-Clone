const router = require("express").Router();
const validateModel = require("../utils/validateModel.js");
const { userSchema } = require("../schema.js");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

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
        const {user} = req.body;
        const newUser = new User({username: user.name, email: user.email});
        
        const registeredUser = await User.register(newUser, user.password);
        
        console.log(registeredUser);
        req.flash("success", `Welcome to Wonderlust, ${user.name}!`);
        res.redirect("/listings");
    }
    catch (err) {
        console.log(err.message);
        req.flash("error", err.message);
        res.redirect("/signup");
    }
});

module.exports = router;