const routeTemplate = `const express = require('express')
const app = express.Router()
const <%= modelName %>Service = require('../services/<%= modelName %>.service')
const <%= modelName %>Validator = require('../middlewares/validators/<%= modelName %>.validator')
const idValidator = require('../middlewares/validators/id.validator')
const auth = require('../middlewares/auth/auth')
const __ = require('../util/response.util')

app.get('/', auth.authentication, async (req, res) => {
  try {
    const { <%= modelName %>Data, message, status  } = await <%= modelName %>Service._get<%= modelName %>s(req.query)
    return __.successMsg(req, res, status, <%= modelName %>Data, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.get('/:id', auth.authentication, idValidator.isValidId, async (req, res) => {
  try {
    const { <%= modelName %>Data, message, status  } = await <%= modelName %>Service._getOne<%= modelName %>(req.params.id)
    return __.successMsg(req, res, status, <%= modelName %>Data, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.post('/', auth.authentication, <%= modelName %>Validator.create<%= modelName %>, async (req, res) => {
  try {
    const { created<%= modelName %>, message, status  } = await <%= modelName %>Service._create<%= modelName %>(req.body)
    return __.successMsg(req, res, status, created<%= modelName %>, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.patch('/:id', auth.authentication, idValidator.isValidId, <%= modelName %>Validator.update<%= modelName %>, async (req, res) => {
  try {
    const { updated<%= modelName %>, message, status  } = await <%= modelName %>Service._update<%= modelName %>(req.params.id, req.body)
    return __.successMsg(req, res, status, updated<%= modelName %>, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.delete('/:id', auth.authentication, idValidator.isValidId, async (req, res) => {
  try {
    const { deleted<%= modelName %>, message, status  } = await <%= modelName %>Service._delete<%= modelName %>(req.params.id)
    return __.successMsg(req, res, status, deleted<%= modelName %>, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

module.exports = app`

module.exports = {
  routeTemplate
}
