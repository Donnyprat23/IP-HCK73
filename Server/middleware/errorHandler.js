const { JsonWebTokenError } = require("jsonwebtoken");

function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.mesasge || "ISE";
  console.log(err, "><><><></>");
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;

    case "Invalid user":
      status = 401;
      message = "invalid user/password";
      break;

    case "invalid email/password":
      status = 400;
      message = "email/password can not be empty";
      break;

    case "invalid-token":
    case "JsonWebTokenError":
      status = 401;
      message = "Error authentication";
      break;

    case "forbidden":
      status = 403;
      message = "Forbidden error at authorization";
      break;

    case "Error not-found":
      status = 404;
      message = "Data Not Found";
      break;

    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
