// define wrapAsync() to handler errors of async-ops. by adding try-catch statements to it:
module.exports = (asyFunc) => {
    return (req, res, next) => {
        asyFunc(req, res, next).catch(err => next(err));
    }
} 