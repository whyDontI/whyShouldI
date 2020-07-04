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
      function createModel () {
        var questions = [
          {
            type: 'input',
            name: 'modelName',
            message: 'Model name: '
          },
          {
            type: 'input',
            name: 'dbName',
            message: 'Enter DataBase name'
          },
          {
            type: 'input',
            name: 'pluralName',
            message: 'Custom plural form (used to build REST URL)'
          },
          {
            type: 'input',
            name: 'appType',
            message: 'What sort of application you want?',
            choices: [
              'API with user authentication',
              'Black Express Server'
            ],
            when: function (answers) {
              return answers
            }
          },
          {
            type: 'input',
            name: 'propertyName',
            message: 'Property name',
            when: function (answers) {
              return answers
            }
          },
          {
            type: 'input',
            name: 'propertyType',
            message: 'Property type',
            choices: [
              'string',
              'number',
              'boolean',
              'object',
              'array',
              'date',
              'buffer',
              'geopoint',
              'any'
            ],
            when: function (answers) {
              return answers
            }
          },
          {
            type: 'confirm',
            name: 'propertyRequired',
            message: 'Required? (y/N)',
            when: function (answers) {
              return answers
            }
          },
          {
            type: 'confirm',
            name: 'askAgain',
            message: 'Do you want to add another model',
            when: function (answers) {
              return answers
            }
          }
        ];

        inquirer.prompt(questions).then(answers => {
          if (answers.askAgain) {
            createModel();
          }
        });
      }
    })

  return create;
}

module.exports = { makeCreateCommand };
