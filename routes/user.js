const router = require("express").Router();
const validateModel = require("../utils/validateModel.js");
const { userSchema } = require("../schema.js");
const User = require("../models/user.js");

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

router.post("/signup", validateModel(userSchema), (req, res) => {
    const {user} = req.body;
    
    res.send(user);
});

module.exports = router;