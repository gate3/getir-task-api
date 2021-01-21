"use strict";

const Joi = require("joi");

const errorMessages = {
  START_DATE_GREATER_THAN_END: "Start date cannot be later than the end date.",
  END_DATE_LESS_THAN_START: "Start date cannot be later than the end date.",
  INVALID_DATE_ERROR: " is not a valid date, please provide a valid value.",
  GENERIC_INVALID_VALUE:
    " is not a valid number. Please provide a valid value.",
  REQUIRED_FIELD_ERROR: "is a required field, please provide a value.",
  MINIMUM_COUNT_GREATER_THAN_MAX:
    "The value provided for minimum count must not be higher than maximum count.",
};

const schema = {
  startDate: Joi.date()
    .iso()
    .max(Joi.ref("endDate"))
    .required()
    .messages({
      "date.max": errorMessages.START_DATE_GREATER_THAN_END,
      "date.format": `The start date provided ${errorMessages.INVALID_DATE_ERROR}`,
      "any.empty": `Start date ${errorMessages.REQUIRED_FIELD_ERROR}`,
      "any.required": `Start date ${errorMessages.REQUIRED_FIELD_ERROR}`,
    }),
  endDate: Joi.date()
    .iso()
    .required()
    .messages({
      "date.format": `The end date provided ${errorMessages.INVALID_DATE_ERROR}`,
      "any.empty": `End date ${errorMessages.REQUIRED_FIELD_ERROR}`,
      "any.required": `End date ${errorMessages.REQUIRED_FIELD_ERROR}`,
    }),
  minCount: Joi.number()
    .integer()
    .max(Joi.ref("maxCount"))
    .required()
    .messages({
      "number.base": `The value provided for minimum count ${errorMessages.GENERIC_INVALID_VALUE}`,
      "number.format": `The value provided for minimum count ${errorMessages.GENERIC_INVALID_VALUE}`,
      "number.max": errorMessages.MINIMUM_COUNT_GREATER_THAN_MAX,
      "any.empty": `Minimum Count ${errorMessages.REQUIRED_FIELD_ERROR}`,
      "any.required": `Minimum Count ${errorMessages.REQUIRED_FIELD_ERROR}`,
    })
    .strict(),
  maxCount: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": `The value provided for maximum count ${errorMessages.GENERIC_INVALID_VALUE}`,
      "number.format": `The value provided for maximum count ${errorMessages.GENERIC_INVALID_VALUE}`,
      "any.empty": `Maximum Count ${errorMessages.REQUIRED_FIELD_ERROR}`,
      "any.required": `Maximum Count ${errorMessages.REQUIRED_FIELD_ERROR}`,
    })
    .strict(),
};

module.exports = (data) => Joi.object(schema).validateAsync(data);
