'use strict'

const App = require('./node/App')
const { version } = require('../package')
const { logger } = require('@vuepress/shared-utils')

function createApp (options) {
  logger.wait('Extracting site metadata...')
  return new App(options)
}

async function dev (options) {
  const app = createApp(options)
  await app.process()
  return app.dev()
}

async function build (options) {
  const app = createApp(options)
  await app.process()
  return app.build()
}

exports.version = version
exports.createApp = createApp
exports.dev = dev
exports.build = build
exports.eject = require('./eject')
