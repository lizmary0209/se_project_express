const {
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
} = require("../utils/errors");

const errorHandler = (err, req, res) => {
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).json({ message: "Invalid data provided" });
  }

  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).json({ message: "Resource not found" });
  }

  if (err.code === 11000) {
    return res.status(CONFLICT).json({ message: "Email already exists" });
  }

  if (err.status === UNAUTHORIZED) {
    return res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
  }

  if (err.status === NOT_FOUND) {
    return res.status(NOT_FOUND).json({ message: "Resource not found" });
  }

  return res
    .status(SERVER_ERROR)
    .json({ message: "An error has occurred on the server" });
};

module.exports = errorHandler;
