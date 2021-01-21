const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morganLogger = require("morgan");
const appLogger = require("../helpers/logger");
const app = express.Router();

app.use(cors());
app.use(helmet());
app.use(morganLogger("combined", { stream: appLogger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
