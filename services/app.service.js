const fs = require('fs');
const ejs = require('ejs');
const cwd = process.cwd()
const { capitalizeFirstLetter } = require('../util/util')

// Template imports
const { modelTemplate } = require('../templates/document.model.template')
const { routeTemplate } = require('../templates/document.route.template')
const { queryTemplate } = require('../templates/document.query.template')
const { serviceTemplate } = require('../templates/document.service.template')
const { validatorTemplate } = require('../templates/document.validator.template')
const { packageJsonTemplate } = require('../templates/package.json.template')

/**
 * createDirectory() Create a Directory for application
 *
 * @param {string} dir - Directory name
 *
 * @return {void}
 */
function createDirectory (dir) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }, (error) => {
        if (error) {
          console.log(`[ ✗  ] ${ error }`)
        }
        console.log(`[ ✓  ] Created ${ dir }`)
      })
    }
  } catch (error) {
    console.log(`[ ✗  ] ${ error }`)
  }
}

/**
 * generateFile() Generate file with given template
 *
 * @param {String} template - Template text
 *
 * @param {Object} object - Data to be inserted in template
 *
 * @return {Promise}
 */
async function generateFile (template, dataObject, destination) {
  try {
    dataObject.capitalizeFirstLetter = capitalizeFirstLetter;
    let output = ejs.render(template, dataObject);
    await fs.appendFileSync(destination, output)
    console.log(`[ ✓  ] Created ${destination}`)
  } catch (error) {
    console.log(`[ ✗  ] ${ error }`)
  }
}

/**
 * generateUserFiles() Generates User files
 *
 * @return {Promise}
 */
function generateUserFiles () {
  try {
    const modelData = {
      properties: [
        {
          propertyName: 'name',
          propertyType: 'String',
          propertyRequired: true
        },
        {
          propertyName: 'email',
          propertyType: 'String',
          propertyRequired: true
        },
        {
          propertyName: 'phoneNumber',
          propertyType: 'Number',
          propertyRequired: true
        }
      ],
      modelName: 'user',
      dbName: 'users',
      pluralName: 'users'
    }

    createDirectory(`${cwd}/model/`)
    createDirectory(`${cwd}/query/`)
    createDirectory(`${cwd}/service/`)
    createDirectory(`${cwd}/route/`)
    createDirectory(`${cwd}/middleware/validator/`)
    
    generateFile(modelTemplate, modelData, `${cwd}/model/user.model.js`)
    generateFile(queryTemplate, modelData, `${cwd}/query/user.query.js`)
    generateFile(routeTemplate, modelData, `${cwd}/route/user.route.js`)
    generateFile(serviceTemplate, modelData, `${cwd}/service/user.service.js`)
    generateFile(validatorTemplate, modelData, `${cwd}/middleware/validator/user.validator.js`)

  } catch (error) {
      console.log(error)
  }
}

module.exports = {
  createDirectory,
  generateFile,
  generateUserFiles
}
