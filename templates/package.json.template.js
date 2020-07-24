const packageJsonTemplate = `
{
  "name": "<%= appName %>",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "echo \'Error: no test specified\' && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@hapi/joi": "^17.1.0",
    "axios": "^0.19.2",
    "bcrypt": "^4.0.1",
    "body-parser": "^1.19.0",
    "bunyan": "^1.8.12",
    "bunyan-express-serializer": "^1.0.0",
    "chalk": "^3.0.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-request-id": "^1.4.1",
    "helmet": "^3.21.3",
    "joi": "^14.3.1",
    "jsonwebtoken": "^8.5.1",
    "md5": "^2.2.1",
    "mongoose": "^5.9.3",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "standard": "^14.3.1"
  }
}`

module.exports = {
  packageJsonTemplate
}
