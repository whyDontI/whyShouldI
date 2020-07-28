const validatorTemplate = `const __ = require('../../util/response.util')
const joi = require('joi')
const phoneNumberRegEx = /^[0-9]{10}$/

class <%= modelName %>Validator {
  async create<%= capitalizeFirstLetter( modelName ) %> (req, res, next) {
    const schema = joi.object().keys({
      name: joi.string().required(),
      email: joi.string().email().required(),
      phoneNumber: joi.string().regex(phoneNumberRegEx).required(),
      password: joi.string().optional()
    })

    try {
      const result = await joi.validate(req.body, schema)
      if (result) return next()
    } catch (error) {
      __.errorMsg(req, res, 400, error.details[0].message, error)
    }

  }

  async delete<%= capitalizeFirstLetter( modelName ) %> (req, res, next) {
    const schema = joi.object().keys({
      id: joi.array().items(joi.string().min(24).max(24).required()).required()
    })

    try {
      const result = await joi.validate(req.body, schema)
      if (result) return next()
    } catch (error) {
      __.errorMsg(req, res, 400, error.details[0].message, error)
    }
  }

  async update<%= capitalizeFirstLetter( modelName ) %> (req, res, next) {
    const schema = joi.object().keys({
      name: joi.string().optional(),
      email: joi.string().email().optional(),
      phoneNumber: joi.string().regex(phoneNumberRegEx).optional(),
      password: joi.string().optional()
    })

    try {
      const result = await joi.validate(req.body, schema)
      if (result) return next()
    } catch (error) {
      __.errorMsg(req, res, 400, error.details[0].message, error)
    }
  }

  async <%= modelName %>Login (req, res, next) {
    const schema = joi.object().keys({
      phoneNumber: joi.string().regex(phoneNumberRegEx).required(),
      password: joi.string().required()
    })
    try {
      const result = await joi.validate(req.body, schema)
      if (result) return next()
    } catch (error) {
      __.errorMsg(req, res, 400, error.details[0].message, error)
    }
  }
};
module.exports = new <%= modelName %>Validator()`

module.exports = {
  validatorTemplate
}
