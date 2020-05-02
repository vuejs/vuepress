'use strict'

/**
 * Module dependencies.
 */

const { chalk } = require('@vuepress/shared-utils')
const CAC = require('cac')

/**
 * Bootstrap a CAC cli
 * @param {function} beforeParse
 * @param {function} afterParse
 * @returns {Promise<void>}
 */

async function CLI ({
  beforeParse,
  afterParse
}) {
  const cli = CAC()
  beforeParse && await beforeParse(cli)
  cli.parse(process.argv)
  afterParse && await afterParse(cli)
}

/**
 * Wrap a function to catch error.
 * @param {function} fn
 * @returns {function(...[*]): (*|Promise|Promise<T | never>)}
 */

function wrapCommand (fn) {
  return (...args) => {
    return fn(...args).catch(err => {
      console.error(chalk.red(err.stack))
      process.exitCode = 1
    })
  }
}

/**
 * Check if a command is built-in
 * @param {array} argv
 * @returns {boolean}
 */

function isKnownCommand (argv) {
  return ['dev', 'build', 'eject', 'info'].includes(argv[0])
}

module.exports = {
  CLI,
  isKnownCommand,
  wrapCommand
}
