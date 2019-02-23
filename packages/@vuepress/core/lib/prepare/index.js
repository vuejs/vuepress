'use strict'

/**
 * Module dependencies.
 */

const AppContext = require('./AppContext')
const { logger } = require('@vuepress/shared-utils')

/**
 * Expose prepare.
 */

module.exports = async function prepare (sourceDir, cliOptions, isProd) {
  logger.wait('Extracting site metadata...')
  const appContext = AppContext.getInstance(sourceDir, cliOptions, isProd)
  await appContext.process()
  return appContext
}
