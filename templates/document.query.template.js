const queryTemplate = `const <%= modelName %> = require('../models/<%= modelName %>.model')

class <%= modelName %> {
  /**
   *__get<%= modelName %>ById() Get <%= modelName %> by Id
   *@param {string} id - <%= modelName %> _id
   *@return {Promise<mongoose.Query>}
  * */
  async __get<%= modelName %>ById (id) {
    return <%= modelName %>.findOne({
      _id: id
    })
      .lean()
  }

  /**
   *__get<%= modelName %>ByEmail() Get <%= modelName %> by Email
   *@param {string} email - <%= modelName %> email
   *@return {Promise}
  * */
  async __get<%= modelName %>ByEmail (email) {
    return <%= modelName %>.findOne({
      email: email
    })
      .lean()
  }

  /**
   *__get<%= modelName %>ByNumber() Get <%= modelName %> by Number
   *@param {string} number - <%= modelName %> Number
   *@return {Promise}
  * */
  async __get<%= modelName %>ByNumber (number) {
    return <%= modelName %>.findOne({
      phoneNumber: number
    })
      .lean()
  }

  /**
   *__get<%= modelName %>Count() Get <%= modelName %> Count
   *@param {string} phoneNumber - <%= modelName %> phoneNumber
   *@return {Promise<mongoose.Query>}
  * */
  async __get<%= modelName %>Count (phoneNumber) {
    return <%= modelName %>.find({
      phoneNumber: phoneNumber
    })
      .countDocuments()
  }

  /**
   *__get<%= modelName %>s() Get <%= modelName %>s
   *@param {Object} req.query - Express req.query
   *@param {string} query.search - Search string
   *@param {number} query.sort - [sort = -1] One for ascending / negative one for descending
   *@param {number} query.size - [size = 100] Documents per page
   *@param {number} query.page - [page = 0] Page number
   *@return {Promise<mongoose.Query>}
  * */
  async __get<%= modelName %>s ({
    search,
    sort = -1,
    size = 100,
    page = 0
  }) {
    const obj = (search) ? {
      name: {
        $regex: '.*' + search + '.*',
        $options: 'i'
      }
    } : {}

    return <%= modelName %>.find(obj)
      .sort({
        _id: (sort)
      })
      .select('-password -__v')
      .limit(parseInt(size))
      .skip(parseInt(size) * parseInt(page))
      .lean()
  }

  /**
   *__insert<%= modelName %>Details() Create New <%= modelName %> with provided details
   *@param {object} <%= modelName %>data - <%= modelName %> Data object
   *@param {string} <%= modelName %>data.name - <%= modelName %> name
   *@param {string} <%= modelName %>data.email - <%= modelName %> email
   *@param {string} <%= modelName %>data.phoneNumber - <%= modelName %> phoneNumber
   *@param {string} <%= modelName %>data.password - <%= modelName %> password
   *@return {Promise<mongoose.Query>}
  * */
  async __insert<%= modelName %>Details (<%= modelName %>Data) {
    return <%= modelName %>.create(<%= modelName %>Data)
  }

  /**
   *__update<%= modelName %>Details() Update <%= modelName %>
   *@param {string} id - <%= modelName %> _id
   *@param {object} data - Data to be updated
   *@return {Promise<mongoose.Query>}
  * */
  async __update<%= modelName %>Details (id, data) {
    return <%= modelName %>.updateOne({
      _id: id
    }, {
      $set: data
    })
  }

  /**
   *__delete<%= modelName %>() Delete <%= modelName %>
   *@param {string} id - <%= modelName %> _id
   *@return {Promise<mongoose.Query>}
  * */
  async __delete<%= modelName %> (id) {
    return <%= modelName %>.remove({
      _id: id
    })
  }
};

module.exports = new <%= modelName %>()`

module.exports = {
  queryTemplate
}
