const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

const handleCastError = (err, entityName) => {
  if (err.name === "CastError") {
    const error = new Error(`Invalid ${entityName} ID`);
    error.status = BAD_REQUEST;
    return error;
  }
  return err;
};

const handleNotFound = (err, entityName) => {
  if (err.message === `${entityName} not found`) {
    const error = new Error(err.message);
    error.status = NOT_FOUND;
    return error;
  }
  return err;
};

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  handleCastError,
  handleNotFound,
};
