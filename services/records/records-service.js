const recordsValidator = require('./records-validator');
const {fetchRecords} = require('./records-repository');

module.exports = async (requestContext) => {
  await recordsValidator(requestContext.body);

  return fetchRecords(requestContext.body);
};
