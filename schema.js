const Joi = require("joi");

listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image: Joi.string().allow("", null),
        owner: Joi.string().required()
    }).required()
});

reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});

userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string(),
    password: Joi.string().required()
})

module.exports = { listingSchema, reviewSchema, userSchema };