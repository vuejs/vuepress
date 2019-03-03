'use strict'

/**
 * Module dependencies.
 */

const AppContext = require('./AppContext')
const { logger } = require('@vuepress/shared-utils')

/**
 * Expose prepare.
 */

module.exports = async function prepare (options) {
  logger.wait('Extracting site metadata...')
  const appContext = AppContext.getInstance(options)
  await appContext.process()
  return appContext
}
