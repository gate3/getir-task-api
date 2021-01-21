const express = require("express");

const router = express.Router();
const { PATHS } = require("./constants");
const { recordsService } = require("../services/records");
const responseHelper = require("../helpers/http-response");

const recordsRouteHandler = async (req, res) => {
  try {
    const records = await recordsService(req);
    return responseHelper.successResponse(res, { records });
  } catch (e) {
    return responseHelper.errorResponse(res, e, { records: [] });
  }
};
router.post(`${PATHS.RECORDS}`, recordsRouteHandler);

module.exports = router;
