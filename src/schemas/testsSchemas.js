const Joi = require('joi');

const newTestSchema = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  idPeriod: Joi.number().integer().required(),
  idUniversity: Joi.number().integer().required(),
  idSubject: Joi.number().integer().required(),
  idTypeTest: Joi.number().integer().required(),
  idTeacher: Joi.number().integer().required(),
  url: Joi.string().uri().required()
})

module.exports = {
  newTestSchema,
}