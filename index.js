#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();
const { makeCreateCommand } = require('./commands/create.command')

program
  .addCommand(makeCreateCommand())

program.parse(process.argv)

// const service = require('./services/app.service.js')

// service.generateFile('./templates/document.model.js', {
//   modelName: 'Aslam'
// })
