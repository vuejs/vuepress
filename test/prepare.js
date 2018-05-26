const path = require('path')
const fs = require('fs-extra')
const prepare = require('../lib/prepare')
const logger = require('../lib/util/logger')

const tempPath = path.resolve(__dirname, '.temp')
const siteDatePath = path.resolve(__dirname, '../lib/app/.temp/siteData.js')

async function prepareForTest () {
  await fs.ensureDir(tempPath)

  await prepare(path.resolve(__dirname, '../docs'))
  await fs.copy(siteDatePath, path.join(tempPath, 'siteData-i18n.js'))

  await prepare(path.resolve(__dirname, 'docs-simple'))
  await fs.copy(siteDatePath, path.join(tempPath, 'siteData-simple.js'))
}

prepareForTest().then(() => {
  logger.wait('Preparing for testing ...')
})
