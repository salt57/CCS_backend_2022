const express = require("express");

const router = express.Router();
// const question = require("../models/Question");
// const admin = require("../models/Admin");
// const user = require("../models/User");
const { adminSchema } = require("../utils/validation_schema");
const validator = require("express-joi-validation").createValidator({});
const { logger } = require("../logs/logger");
// const { loggertracker } = require("../logs/tracker");
const {
  error_codes,
  logical_errors,
  success_codes,
} = require("../tools/error_codes");
require("dotenv").config();

router.post("/", validator.body(adminSchema), async (req, res) => {
  try {
    const { username, round } = req.body;
    const userInfo = await findOne({ username: username });
    userInfo.round = round;
    userInfo.save();
  } catch (e) {
    logger.error(error_codes.E0);
    return res.status(500).json({
      code: "E0",
      error: e,
    });
  }
});
