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
        const { ques } = req.body;


        if (ques.quesId>=1 && ques.quesId<=10){
            domainsAttempted = "Tech";
        }else if (
          ques.quesId >= (10+1) &&
          ques.quesId <= (10*2)
        ) {
          domainsAttempted = "Design";
        }else if (
          ques.quesId >= ((2*10)+1) &&
          ques.quesId <= (10*3)
        ) {
          domainsAttempted = "Management";
        }
        
        const userInfo = await user.findOne({ username: username });
        console.log(userInfo)
        // userInfo.ques.quesId = ques.quesId
        // userInfo.domainsAttempted.push(domainsAttempted)
        userInfo.questionAttempted.push(ques);

        userInfo.save()


        //Logging
        const info = {
            username,
            quesId: ques.quesId,
            domainsAttempted,
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