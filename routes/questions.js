const express = require("express");

const router = express.Router();
const question = require("../models/Question");
const user = require("../models/User");
const { authUserSchema } = require("../utils/validation_schema");
const validator = require("express-joi-validation").createValidator({});
const { logger } = require("../logs/logger");
const { loggertracker } = require("../logs/tracker");
const { error_codes, logical_errors } = require("../tools/error_codes");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    // const { username } = req.participant;
    const { username } = req.body;
    const { domain } = req.body;
    const { difficulty } = req.body;

    const questionInfo = await question.find({
      difficulty: difficulty,
      domain: domain,
    });

    const userInfo = await user.findOne({ username: username });


    // console.log(typeof questionInfo.length)
    console.log(questionInfo[0].quesId)

    var arr = []
    for (let i = 0; i < questionInfo.length; i++) {
        arr.push(questionInfo[i].quesId);
    }
    var myArray = arr.filter((n) => !userInfo.questionLoaded.includes(n));
    console.log(myArray);

    // console.log(arr)
    var item = questionInfo[Math.floor(Math.random() * myArray.length)];
    console.log(item)
    
    const info = {
      username,
      domain,
      difficulty,
    };
    logger.error(logical_errors.L7, info);
    return res.json({
      code: "L7",
      question: item
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
