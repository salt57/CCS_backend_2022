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
  domain: Joi.string().valid("Tech", "Design", "Management").required(),
});

const startSchema = Joi.object().keys({
  username: Joi.string().required(),
  domain: Joi.string().valid("Tech", "Design", "Management").required(),
});

module.exports = { authUserSchema, startSchema }