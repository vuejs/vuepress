const { fs, logger } = require('@vuepress/shared-utils')
const prepare = require('@vuepress/core/lib/prepare')
const { docsModes } = require('./meta')

async function prepareForTest () {
  await Promise.all(docsModes.map(async ({ docsPath, docsTempPath }) => {
    await fs.ensureDir(docsTempPath)
    await prepare(docsPath, { theme: 'default', temp: docsTempPath })
  }))
}

module.exports = function globalSetup () {
  logger.wait('Start preparing for testing ...')
  return prepareForTest().then(() => {
    logger.wait('Finished preparing for testing ...')
  })
}
