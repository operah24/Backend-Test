const Joi = require("joi");

const validateBodySchema = (user) =>{
  const schema = Joi.object({
    username: Joi.string().required(),
    password:Joi.string().required().min(6),
  });
  return schema.validate(user)
}


module.exports = validateBodySchema;