// define a Middleware func() to Validate Listing Data, sent by the client:
const validateModel = (req, res, next) => {
    let error;
    if (req.path === "/listings") { // "listingSchema"
        error = listingSchema.validate(req.body).error;
    } 
    else if (req.path.endsWith("/reviews")) { // "reviewSchema"
        error = reviewSchema.validate(req.body).error;
    }

    if(error) {
        let errMsg = error.details.map((err) => err.message).join(',');
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}

module.exports = validateModel;