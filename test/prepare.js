const path = require('path')
const fs = require('fs-extra')
const prepare = require('../lib/prepare')

const tempPath = path.resolve(__dirname, '.temp')
const siteDatePath = path.resolve(__dirname, '../lib/app/.temp/siteData.js')

async function prepareForTest () {
  fs.ensureDirSync(tempPath)

  await prepare(path.resolve(__dirname, '../docs'))
  fs.copy(siteDatePath, path.join(tempPath, 'siteData-i18n.js'))

  await prepare(path.resolve(__dirname, 'simple'))
  fs.copy(siteDatePath, path.join(tempPath, 'siteData-simple.js'))
}

prepareForTest()
