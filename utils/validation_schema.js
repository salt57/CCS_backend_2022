const Joi = require("joi");

const authUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  quesId: Joi.number().integer().max(40).min(1).required(),
  answer: Joi.string().min(1).max(200).required(),
  // domain: Joi.string().valid("Tech", "Design", "Management").required(),
});

module.exports = { authUserSchema }