const LRU = require('lru-cache')
const { fs, path } = require('@vuepress/shared-utils')

const cache = new LRU({ max: 1000 })

module.exports = async function getFragment (dirname, name) {
  let content = cache.get(name)
  if (content) {
    return content
  }
  const target = path.resolve(dirname, `fragments/${name}.md`)
  content = await fs.readFile(target, 'utf-8')
  cache.set(name, content)
  return content
}
