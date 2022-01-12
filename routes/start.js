const express = require("express");

const router = express.Router();
const question = require("../models/Question");
const user = require("../models/User");
const { authUserSchema } = require("../utils/validation_schema");
const validator = require("express-joi-validation").createValidator({});
const { logger } = require("../logs/logger");
const { loggertracker } = require("../logs/tracker");
const { error_codes, logical_errors } = require("../tools/error_codes");
const moment = require("moment")
require("dotenv").config();

router.post("/", async (req, res) => {
  // const { username } = req.participant;
  const { username } = req.body;
  const { domain } = req.body

  var start = new Date()
  var end = moment(start).add(process.env.DURATION, "m").toDate();
  const userInfo = await user.findOne({ username: username });

  if(!userInfo){
    const new_user = new user({
        username,
        domainsAttempted: [],
        questionAttempted: [],
        startTime: start,
        endTime: end,
    });
        new_user.save();
    }else{
        if(userInfo.domainsAttempted.includes(domain)){
            console.log("in")
            logger.error(logical_errors.L2, {username: username});
            return res.json({
               code: "L2",
            });
        }
        userInfo.domainsAttempted.push(domain)
        userInfo.startTime = start
        userInfo.endTime = end
        userInfo.save()
        
    }
})

module.exports = router;