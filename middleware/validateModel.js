const ExpressError = require("../utils/ExpressError.js");

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