const express = require("express");

const router = express.Router();
const question = require("../models/Question");
const { authUserSchema } = require("../utils/validation_schema");
const validator = require("express-joi-validation").createValidator({});
const { logger } = require("../logs/logger");
const { loggertracker } = require("../logs/tracker");
const { error_codes } = require("../tools/error_codes");
require("dotenv").config();

router.post("/", validator.body(authUserSchema), async (req, res) => {
    try{
        const { username } = req.participant;
        const { quesId } = req.body;
        const { answer } = req.body; 
        const { domain } = req.body;

        


    } catch (e) {
    logger.error(error_codes.E0, playerInfo);
    return res.status(500).json({
      code: "E0",
      error: e,
    });
  }
});

module.exports = router;