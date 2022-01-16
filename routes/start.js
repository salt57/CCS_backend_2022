const express = require("express");

const router = express.Router();
const question = require("../models/Question");
const user = require("../models/User");
const { startSchema } = require("../utils/validation_schema");
const validator = require("express-joi-validation").createValidator({});
const { addToSheet } = require("../utils/addToSheet");
const { logger } = require("../logs/logger");
const {
  error_codes,
  logical_errors,
  success_codes,
} = require("../tools/error_codes");
const moment = require("moment");
require("dotenv").config();

router.post("/", validator.body(startSchema), async (req, res) => {
  try {
    // const { username } = req.participant;
    const { username, email } = req.body;
    const { domain } = req.body;

    var start = new Date();
    var end = moment(start).add(process.env.DURATION, "m").toDate();
    const userInfo = await user.findOne({ username: username });

    if (!userInfo) {
      const new_user = new user({
        username,
        domainsAttempted: [domain],
        techAttempted: [],
        managementAttempted: [],
        designAttempted: [],
        startTime: start,
        endTime: end,
        round: 1,
      });
      new_user.save();
      addToSheet({ username: username, email: email, round: 1 });
    } else {
      if (userInfo.domainsAttempted.includes(domain)) {
        // console.log("in")
        logger.warn(logical_errors.L2, { username: username });
        return res.json({
          code: "L2",
        });
      }
      userInfo.domainsAttempted.push(domain);
      userInfo.startTime = start;
      userInfo.endTime = end;
      userInfo.questionLoaded = null;
      userInfo.save();
    }

    logger.info(success_codes.S4, { username: username });
    return res.json({
      code: "S4",
    });
  } catch (error) {
    logger.error(error_codes.E0);
    return res.status(500).json({
      code: "E0",
      message: error,
    });
  }
});

module.exports = router;
