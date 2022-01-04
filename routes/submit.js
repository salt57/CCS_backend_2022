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

router.post("/", validator.body(authUserSchema), async (req, res) => {
    try{
        // const { username } = req.participant;
        const { username } = req.body;
        const { quesId } = req.body;
        const { answer } = req.body; 


        if (quesId>=1 && quesId<=10){
            domainsAttempted = "Tech";
        }else if (
          quesId >= (10+1) &&
          quesId <= (10*2)
        ) {
          domainsAttempted = "Design";
        }else if (
          quesId >= ((2*10)+1) &&
          quesId <= (10*3)
        ) {
          domainsAttempted = "Management";
        }
        
        const userInfo = await user.findOne({ username: username });
        console.log(userInfo)
        userInfo.quesId = quesId
        userInfo.answer = answer
        userInfo.domainsAttempted.push(domainsAttempted)
        userInfo.questionAnswered.push(quesId);

        userInfo.save()


        //Logging
        const info = {
            username,
            quesId,
            domainsAttempted,
            questionAnswered: quesId
        };
        logger.error(logical_errors.L7, info);
            return res.json({
                code: "L7",
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