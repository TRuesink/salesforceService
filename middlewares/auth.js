const ErrorResponse = require("../utils/errorResponse");

exports.authorized = (req, res, next) => {
  if (!req.session.auth) {
    return next(new ErrorResponse("Not Authorized", 401));
  }
  next();
};
