'use strict'

/**
 * Module dependencies.
 */

const AppContext = require('./AppContext')

/**
 * Expose prepare.
 */

module.exports = async function prepare (sourceDir, cliOptions, isProd) {
  const appContext = AppContext.getInstance(sourceDir, cliOptions, isProd)
  await appContext.process()
  return appContext
}
