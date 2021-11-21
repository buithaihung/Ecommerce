const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;
    //Wrong mongoose objectID error
    if (err.name === "CastError") {
      const message = `Resource not found . Invalid ${err.path}`;
      error = new ErrorHandler(message, 404);
    }

    //Handling Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHanndler(message, 400);
    }

    //Handling Mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate${Object.keys(err.keyValue)} entered`;
      error = new ErrorHanndler(message, 400);
    }
    //Handling wrong JWT error
    if (err.name === "JsonWebTokenError") {
      const message = `JSON web token is invalid please try again`;
      error = new ErrorHanndler(message, 400);
    }
    //Handling expired JWT error
    if (err.name === "TokenExpiredError") {
      const message = `JSON web token is expired please try again`;
      error = new ErrorHanndler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
