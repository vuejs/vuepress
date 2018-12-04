'use strict'

module.exports = async function (commandName, sourceDir, cliOptions = {}) {
  const prepare = require('./prepare/index')
  const ctx = await prepare(sourceDir, cliOptions, false /* isProd */)
  const cli = require('cac')()
  cli.help()
  ctx.pluginAPI.options.registerCommand.apply(cli)
  cli.parse()
  return cli
}
