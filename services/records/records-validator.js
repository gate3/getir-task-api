const Joi = require("joi");

const errorMessages = {
  START_DATE_GREATER_THAN_END: "Start date cannot be later than the end date.",
  END_DATE_LESS_THAN_START: "Start date cannot be later than the end date.",
  INVALID_DATE_ERROR: " Is not a valid date, please provide a valid value.",
  GENERIC_INVALID_VALUE:
    " is not a valid number. Please provide a valid value.",
  REQUIRED_FIELD_ERROR: "is a required field, please provide a value.",
  MINIMUM_COUNT_GREATER_THAN_MAX: "The value provided for ",
};

const createGenericErrorObject = (errorMessage) => new Error(errorMessage);

const schema = {
  startDate: Joi.date()
    .error(
      createGenericErrorObject(
        `The start date provided ${errorMessages.INVALID_DATE_ERROR}`
      )
    )
    .max(Joi.ref("endDate"))
    .error(createGenericErrorObject(errorMessages.START_DATE_GREATER_THAN_END))
    .required()
    .error(
      createGenericErrorObject(
        `Start date ${errorMessages.REQUIRED_FIELD_ERROR}`
      )
    ),

  endDate: Joi.date()
    .error(
      createGenericErrorObject(
        `The start date provided ${errorMessages.INVALID_DATE_ERROR}`
      )
    )
    .required()
    .error(
      createGenericErrorObject(`End date ${errorMessages.REQUIRED_FIELD_ERROR}`)
    ),

  minCount: Joi.number()
    .error(
      createGenericErrorObject(
        `The value provided for minimum count ${errorMessages.GENERIC_INVALID_VALUE}`
      )
    )
    .integer()
    .max(Joi.ref("maxCount"))
    .error(
      createGenericErrorObject(errorMessages.MINIMUM_COUNT_GREATER_THAN_MAX)
    )
    .required()
    .error(
      createGenericErrorObject(
        `Minimum Count ${errorMessages.REQUIRED_FIELD_ERROR}`
      )
    ),
  maxCount: Joi.number()
    .error(
      createGenericErrorObject(
        `The value provided for maximum count ${errorMessages.GENERIC_INVALID_VALUE}`
      )
    )
    .integer()
    .error(
      createGenericErrorObject(errorMessages.MINIMUM_COUNT_GREATER_THAN_MAX)
    )
    .required()
    .error(
      createGenericErrorObject(
        `Maximum Count ${errorMessages.REQUIRED_FIELD_ERROR}`
      )
    ),
};

module.exports = (data) => Joi.object(schema).validate(data);
