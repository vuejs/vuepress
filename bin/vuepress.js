const path = require('path')
const chalk = require('chalk')
const { dev, build } = require('../lib')

const sourceDir = path.resolve(process.cwd(), 'docs')

const command = process.argv.slice(2)[0]

if (command === 'dev') {
  wrapCommand(dev)(sourceDir)
}

if (command === 'build') {
  wrapCommand(build)(sourceDir)
}

function wrapCommand (fn) {
  return (...args) => {
    return fn(...args).catch(err => {
      console.error(chalk.red(err.stack))
    })
  }
}
