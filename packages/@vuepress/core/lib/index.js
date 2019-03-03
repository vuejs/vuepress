'use strict'

const App = require('./node/App')
const { logger } = require('@vuepress/shared-utils')

function createApp (options) {
  logger.wait('Extracting site metadata...')
  return new App(options)
}

async function dev (options) {
  const app = createApp(options)
  await app.process()
  await app.dev()
}

async function build (options) {
  const app = createApp(options)
  await app.process()
  await app.build()
}

exports.createApp = createApp
exports.dev = dev
exports.build = build
exports.eject = require('./eject')
