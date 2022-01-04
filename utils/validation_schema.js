const Joi = require("joi");

const authUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  ques: Joi.object()
  .keys({
   quesId: Joi.number().required(),
   answer: Joi.string().required(),
  })
  .required()
  // answer: Joi.string().min(1).max(200).required(),
  // domain: Joi.string().valid("Tech", "Design", "Management").required(),
});

module.exports = { authUserSchema }