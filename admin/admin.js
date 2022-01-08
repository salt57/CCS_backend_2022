const express = require("express");

const router = express.Router();
const question = require("../models/Question");
const admin = require("../models/Admin");
const user = require("../models/User");
const { logger } = require("../logs/logger");
const { loggertracker } = require("../logs/tracker");
const { error_codes, logical_errors, success_codes } = require("../tools/error_codes");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    // const { username } = req.participant;
    const { username } = req.body;
    const { candidate } = req.query

    const adminInfo = await admin
      .findOne({ username: username })
      .select("username")
      .lean();
    if (!adminInfo) {
      const info = {
        username: username
      }
      logger.error(logical_errors.L1, info);
      return res.json({
        code: "L1",
      });
    }

    const userInfo = await user.findOne({ username: candidate });
    console.log(userInfo);
    // userInfo.ques.quesId = ques.quesId
    // userInfo.domainsAttempted.push(domainsAttempted)
    logger.info(success_codes.S1, {candidate: userInfo.username})
    return res.json({
      code: "S1",
      candidateInfo: userInfo
    })
  } catch (e) {
    logger.error(error_codes.E0);
    return res.status(500).json({
      code: "E0",
      error: e,
    });
  }
});

module.exports = router;
