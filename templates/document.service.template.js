const serviceTemplate = `const jwt = require('../middlewares/auth/auth')
const <%= modelName %>Query = require('../dataAdapter/mongo/query/<%= modelName %>.query')
const md5 = require('md5')

class <%= capitalizeFirstLetter( modelName ) %>Details {
  /**
    *_<%= modelName %>Login() <%= modelName %> login
    *@param {object} body - Express req.body
    *@param {string} body.phoneNumber - phonwNumber
    *@param {string} body.password - password
    *@return {Promise<Object>}
    * */
  async _<%= modelName %>Login ({
    phoneNumber,
    password
  }) {
    try {
      const <%= modelName %>Data = await <%= modelName %>Query.__get<%= capitalizeFirstLetter( modelName ) %>ByNumber(phoneNumber)
      if (!<%= modelName %>Data) return Promise.resolve({ message: 'Incorrect Number or <%= modelName %> does not exists', status: 400, <%= modelName %>Data: {} })
      if (!<%= modelName %>Data.password || <%= modelName %>Data.password !== md5(password)) return Promise.resolve({ message: 'Incorrect password', status: 401, <%= modelName %>Data: {} })
      if (<%= modelName %>Data.password === md5(password)) {
        await <%= modelName %>Query.__update<%= capitalizeFirstLetter( modelName ) %>Details(<%= modelName %>Data._id, { lastLoggedIn: Date.now() })
        const token = await jwt.createToken(<%= modelName %>Data._id)

        <%= modelName %>Data.token = token

        // Remove unwanted keys
        delete <%= modelName %>Data.password
        delete <%= modelName %>Data.__v
        return Promise.resolve({ <%= modelName %>Data, message: '<%= modelName %> logged in successfully', status: 200 })
      };
    } catch (error) {
      return Promise.reject(error)
    };
  };

  /**
   *_create<%= capitalizeFirstLetter( modelName ) %>() Create new <%= modelName %>
   *@param {object} body - Express body object
   *@param {string} body.name - name
   *@param {string} body.email - email
   *@param {string} body.phoneNumber - phoneNumber
   *@param {string} body.password - password
   *@return {Promise}
   * */
  async _create<%= capitalizeFirstLetter( modelName ) %> ({
    name,
    email,
    phoneNumber,
    password
  }) {
    try {
      const <%= modelName %>Count = await <%= modelName %>Query.__get<%= capitalizeFirstLetter( modelName ) %>Count(phoneNumber)
      if (<%= modelName %>Count) {
        return Promise.resolve({ created<%= capitalizeFirstLetter( modelName ) %>: {}, message: '<%= modelName %> already exists', status: 400 })
      }
      if (password) {
        password = md5(password)
      }

      const created<%= capitalizeFirstLetter( modelName ) %> = await <%= modelName %>Query.__insert<%= capitalizeFirstLetter( modelName ) %>Details({
        name,
        email,
        phoneNumber,
        password
      })

      delete created<%= capitalizeFirstLetter( modelName ) %>.password
      delete created<%= capitalizeFirstLetter( modelName ) %>.__v
      return Promise.resolve({ created<%= capitalizeFirstLetter( modelName ) %>, message: '<%= modelName %> created successfully', status: 200 })
    } catch (error) {
      return Promise.reject(error)
    }
  };

  /**
    *_update<%= capitalizeFirstLetter( modelName ) %>() Update <%= modelName %>
    *@param {string} id - <%= modelName %> _id
    *@param {object} data - <%= modelName %> data to be updated
    *@return {Promise<Object>}
    * */
  async _update<%= capitalizeFirstLetter( modelName ) %> (id, data) {
    try {
      if (data.password !== undefined) {
        data.password = md5(data.password)
      }
      const updated<%= capitalizeFirstLetter( modelName ) %> = await <%= modelName %>Query.__update<%= capitalizeFirstLetter( modelName ) %>Details(id, data)
      if (!updated<%= capitalizeFirstLetter( modelName ) %>.nModified) { return Promise.resolve({ message: '<%= modelName %> not found', updated<%= capitalizeFirstLetter( modelName ) %>, status: 400 }) }
      delete data.password
      return Promise.resolve({ message: '<%= modelName %> updated Successfully!', updated<%= capitalizeFirstLetter( modelName ) %>, status: 200 })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
    *_delete<%= capitalizeFirstLetter( modelName ) %>() Delete <%= modelName %>
    *@param {object} req
    *@param {object} res
    *@return {undefined}
    * */
  async _delete<%= capitalizeFirstLetter( modelName ) %> (id) {
    try {
      const deleted<%= capitalizeFirstLetter( modelName ) %> = await <%= modelName %>Query.__delete<%= capitalizeFirstLetter( modelName ) %>(id)
      if (!deleted<%= capitalizeFirstLetter( modelName ) %>.deletedCount) return Promise.resolve({ deleted<%= capitalizeFirstLetter( modelName ) %>, message: '<%= modelName %> not found', status: 400 })
      return Promise.resolve({ deleted<%= capitalizeFirstLetter( modelName ) %>, message: 'Deleted <%= modelName %> Successfully!', status: 200 })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
    *_getOne<%= capitalizeFirstLetter( modelName ) %>() Get One <%= modelName %>
    *@param {string} id - <%= modelName %> _id
    *@return {Promise<Object>}
    * */
  async _getOne<%= capitalizeFirstLetter( modelName ) %> (id) {
    try {
      const <%= modelName %>Data = await <%= modelName %>Query.__get<%= capitalizeFirstLetter( modelName ) %>ById(id)
      if (!<%= modelName %>Data) { return Promise.resolve({ <%= modelName %>Data, message: '<%= modelName %> not found', status: 400 }) }
      delete <%= modelName %>Data.password
      <%= modelName %>Data.deleteStatus = undefined
      return Promise.resolve({ <%= modelName %>Data, message: '<%= modelName %> Returned Successfully!', status: 200 })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
    *_get<%= capitalizeFirstLetter( modelName ) %>() Get <%= modelName %>s
    *@param {Object} req.query - Express req.query
    *@return {Promise<Object>}
    * */
  async _get<%= capitalizeFirstLetter( modelName ) %>s (query) {
    try {
      const <%= modelName %>Data = await <%= modelName %>Query.__get<%= capitalizeFirstLetter( modelName ) %>s(query)
      if (!<%= modelName %>Data.length) { return Promise.resolve({ <%= modelName %>Data, message: '<%= modelName %>s not found', status: 400 }) }
      return Promise.resolve({ <%= modelName %>Data, message: '<%= modelName %>s returned successfully', status: 200 })
    } catch (error) {
      return Promise.reject(error)
    }
  }
};

module.exports = new <%= capitalizeFirstLetter( modelName ) %>Details()`

module.exports = {
  serviceTemplate
}
