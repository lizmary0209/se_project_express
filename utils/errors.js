const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

/**
 * Helper: Handle CastError for Mongoose IDs
 * @param {Error} err - error object
 * @param {string} resourceName - name of the resource, e.g., 'User'
 */
function handleCastError(err, resourceName = "Resource") {
  if (err.name === "CastError") {
    err.status = BAD_REQUEST;
    err.message = `Invalid ${resourceName} ID`;
  }
  return err;
}

/**
 * Helper: Handle resource not found errors
 * @param {Error} err - error object
 * @param {string} resourceName - name of the resource, e.g., 'Item'
 */
function handleNotFound(err, resourceName = "Resource") {
  if (!err.status || err.status === SERVER_ERROR) {
    err.status = NOT_FOUND;
    if (!err.message || err.message === "Resource not found") {
      err.message = `${resourceName} not found`;
    }
  }
  return err;
}

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
  handleCastError,
  handleNotFound,
};
