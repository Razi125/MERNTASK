const ErrorHander = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong JWT ERROR
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try agin`;
    err = new ErrorHander(message, 400);
  }

  // JWT EXPIRE ERROR
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, try agin`;
    err = new ErrorHander(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
