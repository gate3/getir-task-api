const recordsValidator = require('./records-validator');
const {fetchRecords} = require('./records-repository');
const responseHelper = require('../../helpers/http-response');

module.exports = async (requestContext) => {
  try {
    await recordsValidator(requestContext.body);
  } catch (e) {
    // We attach the code validation error caused by bad request
    // We then attach our internal code for this and return to be used as a response
    e.code = responseHelper.responseCodes.badRequest;
    throw e;
  }

  return fetchRecords(requestContext.body);
};
