const express = require("express");

const router = express.Router();
const question = require("../models/Question");
const user = require("../models/User");
const { authUserSchema } = require("../utils/validation_schema");
const validator = require("express-joi-validation").createValidator({});
const { logger } = require("../logs/logger");
const { loggertracker } = require("../logs/tracker");
const { error_codes, logical_errors, success_codes } = require("../tools/error_codes");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    // const { username } = req.participant;
    const { username } = req.body;
    // const { domain } = req.body;
    // const { difficulty } = req.body;

    const questionInfo = await question.find({ });

    const userInfo = await user.findOne({ username: username });


    // console.log(typeof questionInfo.length)
    // console.log(questionInfo)

    // var arr = []
    // console.log(questionInfo.length)
    // for (let i = 0; i < questionInfo.length; i++) {
    //     arr.push(questionInfo[i].quesId);
    // }
    // console.log(arr)
    // var myArray = arr.filter((n) => !userInfo.questionAttempted.map(ques => ques.quesId).includes(n));
    // console.log(myArray);

    // console.log(myArray[Math.floor(Math.random() * myArray.length)])
    // var item = questionInfo[myArray[Math.floor(Math.random() * myArray.length)]];
    // console.log(attempted)
    // const possibleQuestions = questionInfo.filter((n) => !userInfo.questionLoaded.includes(n.quesId));
    // if (possibleQuestions.length == 0) {
    //   logger.warn(logical_errors.L2, {username: username});
    //   return res.json({
    //     code: "L2"
    //   });
    // }
    // const requiredQues = possibleQuestions[Math.floor(Math.random() * possibleQuestions.length)]

    // userInfo.questionLoaded.push(requiredQues.quesId)
    // userInfo.save()

    // const info = {
    //   username,
    //   quesId: requiredQues.quesId
    // };
    // logger.info(success_codes.S2, info);
    // return res.json({
    //   code: "S2",
    //   question: requiredQues
    // });
  } catch (e) {
    logger.error(error_codes.E0);
    return res.status(500).json({
      code: "E0",
      error: e,
    });
  }
});

module.exports = router;
