const express = require("express");

const router = express.Router();
const question = require("../models/Question");
const admin = require("../models/Admin");
const user = require("../models/User");
const { logger } = require("../logs/logger");
// const { loggertracker } = require("../logs/tracker");
const {
  error_codes,
  logical_errors,
  success_codes,
} = require("../tools/error_codes");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    // const { username } = req.participant;
    const { username } = req.body;
    const { candidate } = req.query;

    const adminInfo = await admin
      .findOne({ username: username })
      .select("username")
      .lean();
    if (!adminInfo) {
      const info = {
        admin: username,
      };
      logger.warn(logical_errors.L1, info);
      return res.json({
        code: "L1",
      });
    }

    const userInfo = await user.findOne({ username: candidate });
    // console.log(userInfo);

    if (!userInfo) {
      const info = {
        admin: username,
      };
      logger.warn(logical_errors.L1, info);
      return res.json({
        code: "L5",
        candidateInfo: userInfo,
        questions: quesInfo,
      });
    }
    // console.log(userInfo.techAttempted, userInfo.managementAttempted, userInfo.designAttempted)
    const questions = userInfo.techAttempted
      .map((ques) => ques.quesId)
      .concat(
        userInfo.managementAttempted.map((ques) => ques.quesId),
        userInfo.designAttempted.map((ques) => ques.quesId)
      );
    // console.log(questions);
    const quesInfo = await question.find({ quesId: { $in: questions } });
    // console.log(questions)
    // console.log(quesInfo)
    // userInfo.ques.quesId = ques.quesId
    // userInfo.domainsAttempted.push(domainsAttempted)
    logger.info(success_codes.S1, {
      candidate: userInfo.username,
      quesIds: questions,
    });
    return res.json({
      code: "S1",
      candidateInfo: userInfo,
      questions: quesInfo,
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
