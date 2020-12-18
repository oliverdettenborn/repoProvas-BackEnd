const Joi = require('joi');

const newUniversitySchema = Joi.object({
  initial: Joi.string().min(2).max(10).uppercase().required(),
  fullName:  Joi.string().required()
})

const newSubjectSchema = Joi.object({
  name: Joi.string().required(),
  idUniversity: Joi.number().integer().required(),
})

const newTeacherSchema = Joi.object({
  name: Joi.string().required(),
  idUniversity: Joi.number().integer().required(),
  idSubject: Joi.number().integer().required(),
})

module.exports = {
  newUniversitySchema,
  newSubjectSchema,
  newTeacherSchema
}