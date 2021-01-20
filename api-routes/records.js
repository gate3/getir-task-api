const express = require("express");
const router = express.Router();
const { PATHS } = require("./constants");

const recordsRouteHandler = (req, res) => {
  res.send("respond with a resource");
};
/* GET users listing. */
router.post(`${PATHS.RECORDS}`, recordsRouteHandler);

module.exports = router;
