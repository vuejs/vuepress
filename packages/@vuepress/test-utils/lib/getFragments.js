const { fs, path } = require('@vuepress/shared-utils')
const getFragment = require('./getFragment')

module.exports = function getFragments (dirname, target = 'fragments') {
  const names = fs.readdirSync(path.join(dirname, target))
  return names.map(name => {
    const content = getFragment(dirname, `${target}/${name}`)
    return {
      name,
      content
    }
  })
}
