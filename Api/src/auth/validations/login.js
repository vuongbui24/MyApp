const Joi = require("joi");

const loginValidator = data => {
  const rule = Joi.object({
    email: Joi.string().min(6).max(225).required().email(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,20}$"))
      .required(),
  });

  return rule.validate(data);
};

module.exports = loginValidator;
