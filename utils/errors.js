const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

const handleCastError = (err, entityName) => {
  if (err.name === "CastError") {
    err.status = BAD_REQUEST;
    err.message = `Invalid ${entityName} ID`;
  }
};

const handleNotFound = (err, entityName) => {
  if (err.message === `${entityName} not found`) {
    err.status = NOT_FOUND;
  }
};

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  handleCastError,
  handleNotFound,
};
