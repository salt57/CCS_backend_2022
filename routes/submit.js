const express = require("express");
// var moment = require('moment'); // require
// moment().format();
const router = express.Router();
const question = require("../models/Question");
const user = require("../models/User");
const { authUserSchema } = require("../utils/validation_schema");
const validator = require("express-joi-validation").createValidator({});
const { logger } = require("../logs/logger");
const { loggerStartEnd } = require("../logs/startend");
const { error_codes, logical_errors, success_codes } = require("../tools/error_codes");
require("dotenv").config();

router.post("/", validator.body(authUserSchema), async (req, res) => {
  try {
    // const { username } = req.participant;
    const { username } = req.body;
    const { questions } = req.body;
    const { domain } = req.body;
    const { finalSubmit } = req.body;

    const userInfo = await user.findOne({ username: username });
    // console.log(userInfo);

    if (!userInfo.endTime) {
      // console.log("test not started or time over");
      logger.warn(logical_errors.L4, {username: username});
      return res.json({
        code:"L4",
      });
    } else if (userInfo.endTime < new Date()) {
      // console.log("time over");
      userInfo.startTime = null;
      userInfo.endTime = null;
      userInfo.save();
      logger.warn(logical_errors.L3, {username: username});
      return res.json({
        code:"L3",
      });
    }

    // userInfo.ques.quesId = ques.quesId
    // userInfo.domainsAttempted.push(domainsAttempted)

    switch (domain) {
      case "Tech":
        userInfo.techAttempted = questions
        break;
      case "Management":
        userInfo.managementAttempted = questions
        break;
      case "Design":
        userInfo.designAttempted = questions
        break;
      default:
        break;
    }
    
    if (finalSubmit) {
      userInfo.startTime = null;
      userInfo.endTime = null;
    }

    userInfo.save();

    logger.info(success_codes.S3, {username: username});
    return res.json({
      code: "S3",
    });
  } catch (e) {
    logger.error(error_codes.E0);
    return res.status(500).json({
      code: "E0",
      error: e,
    });
  }
});

module.exports = router;
