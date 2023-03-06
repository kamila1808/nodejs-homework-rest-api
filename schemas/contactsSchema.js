const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean().optional(),
});

module.exports = schema