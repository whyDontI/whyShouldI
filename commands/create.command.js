const fs = require('fs')
const commander = require('commander');
const inquirer = require('inquirer');
const appService = require('../services/app.service')
const path = require('path')
const cwd = process.cwd() // Current Working Directory

function validateInput (input) {
   return (input !== '')  
}

function makeCreateCommand () {

  const create = new commander
    .Command('create')
    .alias('c')
    .description('Create an app or model')

  create
    .command('app')
    .alias('a')
    .action(() => {
      var questions = [
        {
          type: 'input',
          name: 'appName',
          message: 'Name of the application:',
          validate: validateInput,
          when: function (answers) {
            return answers
          }
        },
        {
          type: 'input',
          name: 'dirName',
          message: 'Name of the directory:',
          validate: validateInput,
          when: function (answers) {
            return answers            
          }
        },
        {
          type: 'confirm',
          name: 'userAuth',
          message: 'Do you need User authentication route',
          when: function (answers) {
            return answers
          }
        }
      ];
      
      inquirer.prompt(questions).then(answers => {
        const dirName = path.join(cwd, answers.dirName)
        appService.createDirectory(dirName)
        // appService.cloneGitRepo(dirName)
        appService.createPackageJsonFile(answers.appName, dirName)
      });
    })

  create
    .command('model')
    .alias('m')
    .action(() => {
      const modelData = {
        properties: []
      }

      function createModel () {
        var questions = [
          {
            type: 'input',
            name: 'modelName',
            message: 'Model name: ',
            validate: function (answer) { return (answer != '') }
          },
          {
            type: 'input',
            name: 'dbName',
            message: 'Enter DataBase name',
            validate: function (answer) { return (answer != '') }
          },
          {
            type: 'input',
            name: 'pluralName',
            message: 'Custom plural form (used to build REST URL)',
            validate: function (answer) { return (answer != '') }
          }
        ];

        inquirer.prompt(questions).then(answers => {
          Object.assign(modelData, answers)
          createProperty();
        });
      }

      function createProperty () {
        var questions = [
          {
            type: 'input',
            name: 'propertyName',
            message: 'Property name',
            validate: function (answer) { return (answer != '') }
          },
          {
            type: 'list',
            name: 'propertyType',
            message: 'Property type',
            choices: [
              'String',
              'Number',
              'Date',
              'Buffer',
              'Boolean',
              'Mixed',
              'ObjectId',
              'Array',
              'Decimal128',
              'Map',
              'Schema',
            ]
          },
          {
            type: 'confirm',
            name: 'propertyRequired',
            message: 'Required? (y/N)'
          },
          {
            type: 'confirm',
            name: 'askAgain',
            message: 'Want to add another property'
          }
        ];

        inquirer.prompt(questions).then(answers => {
          modelData.properties.push(answers)
          if (answers.askAgain) {
            createProperty();
          }
          if (!answers.askAgain) {
            // model.js
            if (!fs.existsSync(`${cwd}/model/`)) {
              fs.mkdir(`${cwd}/model/`, (err) => {
                console.log(err)
              })
            }
            appService.generateFile(`${cwd}/templates/document.model.js`, modelData, `${cwd}/model/${modelData.modelName}.model.js`)
          }
        });
      }

      createModel();
    })

  return create;
}

module.exports = { makeCreateCommand };
