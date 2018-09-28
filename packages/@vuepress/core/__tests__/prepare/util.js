const { fs, path } = require('@vuepress/shared-utils')
const AppContext = require('../../lib/prepare/AppContext')
const createMarkdown = require('../../../markdown/lib/index')

function getAppContext () {
  return new AppContext('.')
}

function getComputed () {
  const context = getAppContext()
  return new context.ClientComputedMixinConstructor()
}

const docsBaseDir = path.resolve(__dirname, 'fixtures/docs')

function getDocument (relative) {
  return {
    filePath: path.join(docsBaseDir, relative),
    relative
  }
}

const getMarkdown = createMarkdown

const readFile = async filePath => await fs.readFile(filePath, 'utf-8')

module.exports = {
  getAppContext,
  getComputed,
  getMarkdown,
  getDocument,
  readFile
}
