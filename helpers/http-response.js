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
   * @param code - The error or success code, defaults to 0 for success
   * @param message - Any message to be passed along with response payload
   * @param {object} data - The data to be returned back as a response
   * @return response object
   */
  successResponse(responseObject, data = {}, code = 0, message = 'Success') {
    const responseJsonData = {
      code,
      msg: message,
      ...data
    };
    return responseObject.json(responseJsonData);
  };

  /**
   * @param {object} responseObject - The expressjs response object
   * @param {object} errorObject - A javascript Error object
   * @param {number} statusCode - The http status code to return
   * @param data - Any extra data to be passed with the error response
   * @return response object
   */
  errorResponse(
    responseObject, errorObject, data = {}, statusCode = StatusCodes.BAD_REQUEST
  ) {
    const message = (
      errorObject.message != null ? errorObject.message : 'Failed'
    );
    if (errorObject.status != null) {
      statusCode = errorObject.status ? errorObject.status : statusCode;
      delete errorObject.status;
    }

    return responseObject.status(statusCode).json({
      code: statusCode,
      msg: message,
      ...data
    });
  }
}

module.exports = new ResponseHelpr();
