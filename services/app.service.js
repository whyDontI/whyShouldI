const fs = require('fs');
const ejs = require('ejs');
const cwd = process.cwd()

/**
 * createDirectory() Create a Directory for application
 *
 * @param {string} dir - Directory name
 *
 * @return {void}
 */
function createDirectory (dir) {
  try {
    fs.mkdirSync(dir)
    console.log(`[ ✓  ] ${dir} directory has been successfully created!`)
  } catch (error) {
    console.log(`[ ✗  ] ${error}`)
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
    // const templateData = await fs.readFileSync(template, 'utf8')
    let output = ejs.render(template, dataObject);
    await fs.appendFileSync(destination, output)
    console.log(`[ ✓  ] Created ${destination}`)
  } catch (error) {
    console.log(`[ ✗  ] error`)
  }
}

module.exports = {
  createDirectory,
  generateFile
}
