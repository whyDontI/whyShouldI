#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();
const { makeCreateCommand } = require('./commands/create.command')

program
  .addCommand(makeCreateCommand())

program.parse(process.argv)
