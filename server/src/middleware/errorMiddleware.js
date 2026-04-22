const AppError = require('../errors/AppError');

const errorHandler = (err, req, res, next) => {

    // Log full error only on server
    console.error("ERROR:", {
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });

    // Default values
    let statusCode = err.statusCode || 500;
    let message = "Something went wrong. Please try again later.";

    if (err instanceof AppError) {
        message = err.message;
    }

    return res.status(statusCode).json({
        success: false,
        message,
    });

};

module.exports = errorHandler;