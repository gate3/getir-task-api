require("dotenv").config();
const express = require("express");
const { middleware } = require("./config");
const recordsRoute = require("./api-routes/records");

const app = express();

app.use(middleware);

app.use("/v1", recordsRoute);

// Health Check Endpoint
app.use("/", (req, res) => res.send("Ok"));

module.exports = app;
