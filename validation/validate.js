const Joi = require("joi");

exports.validateParticipant = (data) => {
  const schema = Joi.object({
    participant: Joi.object({
      email: Joi.string().email().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      dob: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    }).required(),
    work: Joi.object({
      companyname: Joi.string().required(),
      salary: Joi.number().required(),
      currency: Joi.string().required(),
    }).required(),
    home: Joi.object({
      country: Joi.string().required(),
      city: Joi.string().required(),
    }).required(),
  });

  return schema.validate(data);
};
