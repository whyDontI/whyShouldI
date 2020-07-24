const routeTemplate = `const express = require('express')
const app = express.Router()
const <%= modelName %>Service = require('../services/<%= modelName %>.service')
const <%= modelName %>Validator = require('../middlewares/validators/<%= modelName %>.validator')
const idValidator = require('../middlewares/validators/id.validator')
const auth = require('../middlewares/auth/auth')
const __ = require('../util/response.util')

app.get('/', auth.authentication, async (req, res) => {
  try {
    const { <%= modelName %>Data, message, status  } = await <%= modelName %>Service._get<%= ( capitalizeFirstLetter( modelName ) ) %>s(req.query)
    return __.successMsg(req, res, status, <%= modelName %>Data, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.get('/:id', auth.authentication, idValidator.isValidId, async (req, res) => {
  try {
    const { <%= modelName %>Data, message, status  } = await <%= modelName %>Service._getOne<%= ( capitalizeFirstLetter( modelName ) ) %>(req.params.id)
    return __.successMsg(req, res, status, <%= modelName %>Data, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.post('/', auth.authentication, <%= modelName %>Validator.create<%= ( capitalizeFirstLetter( modelName ) ) %>, async (req, res) => {
  try {
    const { created<%= ( capitalizeFirstLetter( modelName ) ) %>, message, status  } = await <%= modelName %>Service._create<%= ( capitalizeFirstLetter( modelName ) ) %>(req.body)
    return __.successMsg(req, res, status, created<%= ( capitalizeFirstLetter( modelName ) ) %>, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.patch('/:id', auth.authentication, idValidator.isValidId, <%= modelName %>Validator.update<%= ( capitalizeFirstLetter( modelName ) ) %>, async (req, res) => {
  try {
    const { updated<%= ( capitalizeFirstLetter( modelName ) ) %>, message, status  } = await <%= modelName %>Service._update<%= ( capitalizeFirstLetter( modelName ) ) %>(req.params.id, req.body)
    return __.successMsg(req, res, status, updated<%= ( capitalizeFirstLetter( modelName ) ) %>, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.delete('/:id', auth.authentication, idValidator.isValidId, async (req, res) => {
  try {
    const { deleted<%= ( capitalizeFirstLetter( modelName ) ) %>, message, status  } = await <%= modelName %>Service._delete<%= ( capitalizeFirstLetter( modelName ) ) %>(req.params.id)
    return __.successMsg(req, res, status, deleted<%= ( capitalizeFirstLetter( modelName ) ) %>, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

module.exports = app`

module.exports = {
  routeTemplate
}
