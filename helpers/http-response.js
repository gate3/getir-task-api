const {StatusCodes} = require('http-status-codes');

/**
 * The response helper is used to return errors or success messages.
 * It also helps return the correct status code.
 *
 * This class is important because it helps put the response logic in one place,
 * this makes it much easier to manage and helps keep the code DRY.
 *
 * @module ResponseHelpr
 */
class ResponseHelpr {
  /**
   * @param {object} responseObject - The expressjs response object
   * @param {object} data - The data to be returned back as a response
   * @return {response object}
   */
  successResponse(responseObject, data = null) {
    return responseObject.json(data);
  };

  /**
   * @param {object} responseObject - The expressjs response object
   * @param {object} errorObject - A javascript Error object
   * @param {number} statusCode - The http status code to return
   * @return {response object}
   */
  errorResponse(
    responseObject, errorObject, statusCode = StatusCodes.BAD_REQUEST,
  ) {
    const message = (
      errorObject.message != null ? errorObject.message : 'An error occurred'
    );
    if (errorObject.status != null) {
      statusCode = errorObject.status ? errorObject.status : statusCode;
      delete errorObject.status;
    }

    return responseObject.status(statusCode).json(message);
  }
}

module.exports = new ResponseHelpr();
