const express = require("express");

const router = express.Router();
const question = require("../models/Question");
const user = require("../models/User");
const { startSchema } = require("../utils/validation_schema");
const validator = require("express-joi-validation").createValidator({});
const { logger } = require("../logs/logger");
const { loggerStartEnd } = require("../logs/startend");
// const { loggertracker } = require("../logs/tracker");
const {
  error_codes,
  logical_errors,
  success_codes,
} = require("../tools/error_codes");
require("dotenv").config();

router.post("/", validator.body(startSchema), async (req, res) => {
  try {
    // const { username } = req.participant;
    const { username } = req.body;
    const { domain } = req.body;
    const userInfo = await user.findOne({ username: username });
    console.log(userInfo.endTime, new Date())

    if (!userInfo.domainsAttempted.includes(domain)){
      logger.warn(logical_errors.L6, { username: username });
      return res.json({
        code: "L6",
      });
    }
    if (!userInfo.endTime) {
      // console.log("test not started or time over");
      loggerStartEnd.warn(logical_errors.L4, {username: username});
      return res.json({
        code:"L4",
      });
    } else if (userInfo.endTime < new Date()) {
      // console.log("time over");
      userInfo.startTime = null;
      userInfo.endTime = null;
      userInfo.save();
      loggerStartEnd.warn(logical_errors.L3, {username: username});
      return res.json({
        code:"L3",
      });
    }
    if (userInfo.questionLoaded){
      logger.info(success_codes.S2, userInfo.questionLoaded);
      return res.json({
        code: "S2",
        question: userInfo.questionLoaded,
      });
    }
    const easyquestions = await question.find({
      domain: domain,
      difficulty: "Easy",
    });

    const mediumquestions = await question.find({
      domain: domain,
      difficulty: "Medium",
    });

    const hardquestions = await question.find({
      domain: domain,
      difficulty: "Hard",
    });

    const easyshuffled = easyquestions.sort(() => 0.5 - Math.random());
    var selected = easyshuffled.slice(0, 2);

    const mediumshuffled = mediumquestions.sort(() => 0.5 - Math.random());
    let mediumselected = mediumshuffled.slice(0, 2);

    const hardshuffled = hardquestions.sort(() => 0.5 - Math.random());
    let hardselected = hardshuffled.slice(0, 2);

    selected = selected.concat(hardselected);
    selected = selected.concat(mediumselected);

    var final = [];
    for (let i = 0; i < selected.length; i++) {
      var obj = {};
      obj["quesId"] = selected[i].quesId;
      obj["question"] = selected[i].question;
      final.push(obj);
    }
    userInfo.questionLoaded = final
    userInfo.save()

    logger.info(success_codes.S2, final);
    return res.json({
      code: "S2",
      question: final,
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
