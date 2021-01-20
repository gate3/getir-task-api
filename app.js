require("dotenv").config();
const express = require("express");
const { middleware, database } = require("./config");
const recordsRoute = require("./api-routes/records");

const app = express();

module.exports = async () => {
  // Attempt database connection
  await database.connect();

  app.use(middleware);

  app.use("/v1", recordsRoute);

  // Health Check Endpoint
  app.use("/", (req, res) => res.send("Ok"));

  return app;
};
