const { fs } = require('@vuepress/shared-utils')
const path = require('path')

const docsBaseDir = path.resolve(__dirname, 'fixtures')
const docsModeNames = fs.readdirSync(docsBaseDir)
const docsModes = docsModeNames.map(name => {
  const docsPath = path.resolve(docsBaseDir, name)
  const docsTempPath = path.resolve(docsPath, '.vuepress/.temp')
  return { name, docsPath, docsTempPath }
})

exports.docsModes = docsModes
