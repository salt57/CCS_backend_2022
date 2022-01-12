const Joi = require("joi");

const authUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  questions: Joi.array().items(Joi.object()
  .keys({
   quesId: Joi.number().required(),
   answer: Joi.string().required(),
  }))
  .required(),
  finalSubmit: Joi.boolean(),
  // answer: Joi.string().min(1).max(200).required(),
  domain: Joi.string().valid("Tech", "Design", "Management").required(),
});

module.exports = { authUserSchema }