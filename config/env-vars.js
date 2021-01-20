"use strict";
const joi = require("joi");

// required environment variables
["NODE_ENV", "PORT", "MONGODB_URI"].forEach((name) => {
  if (!process.env[name])
    throw new Error(`Environment variable ${name} is missing`);
});

const envVarsSchema = joi
  .object({
    NODE_ENV: joi.string().required(),
    PORT: joi.any().required(),
    MONGODB_URI: joi.string().required(),
    SERVICE_NAME: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVariables } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars = {
  env: envVariables.NODE_ENV,
  port: envVariables.PORT,
  databaseUrl: envVariables.MONGODB_URI,
  serviceName: envVariables.SERVICE_NAME
};

module.exports = envVars;
