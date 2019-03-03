const { fs, path } = require('@vuepress/shared-utils')
const getFragment = require('./getFragment')

module.exports = function getFragments (dirname, fragmentsDir = 'fragments') {
  const names = fs.readdirSync(path.join(dirname, fragmentsDir))
  return names.map(name => {
    const content = getFragment(dirname, name, fragmentsDir)
    return {
      name,
      content
    }
  })
}
