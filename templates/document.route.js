const express = require('express')
const app = express.Router()
const <%= %>Service = require('../services/<%= %>.service')
const <%= %>Validator = require('../middlewares/validators/<%= %>.validator')
const idValidator = require('../middlewares/validators/id.validator')
const auth = require('../middlewares/auth/auth')
const __ = require('../util/response.util')

app.get('/', auth.authentication, async (req, res) => {
  try {
    const { <%= %>Data, message, status  } = await <%= %>Service._get<%= %>s(req.query)
    return __.successMsg(req, res, status, <%= %>Data, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.get('/:id', auth.authentication, idValidator.isValidId, async (req, res) => {
  try {
    const { <%= %>Data, message, status  } = await <%= %>Service._getOne<%= %>(req.params.id)
    return __.successMsg(req, res, status, <%= %>Data, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.post('/', auth.authentication, <%= %>Validator.create<%= %>, async (req, res) => {
  try {
    const { created<%= %>, message, status  } = await <%= %>Service._create<%= %>(req.body)
    return __.successMsg(req, res, status, created<%= %>, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.patch('/:id', auth.authentication, idValidator.isValidId, <%= %>Validator.update<%= %>, async (req, res) => {
  try {
    const { updated<%= %>, message, status  } = await <%= %>Service._update<%= %>(req.params.id, req.body)
    return __.successMsg(req, res, status, updated<%= %>, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.delete('/:id', auth.authentication, idValidator.isValidId, async (req, res) => {
  try {
    const { deleted<%= %>, message, status  } = await <%= %>Service._delete<%= %>(req.params.id)
    return __.successMsg(req, res, status, deleted<%= %>, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

module.exports = app

