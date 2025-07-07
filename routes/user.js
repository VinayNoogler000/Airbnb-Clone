const router = require("express").Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");

router.get("/demo", wrapAsync( async (req, res) => {
    const newUser = new User ({
        username: "vinay-tambey",
        email: "vinay@gmail.com"
    });

    let registeredUser = await User.register(newUser, "password");
    res.send(registeredUser);
}));

module.exports = router;