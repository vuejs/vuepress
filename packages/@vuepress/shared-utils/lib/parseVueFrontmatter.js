// @ts-ignore
const Utils = require('@vue/component-compiler-utils')
const parseFrontmatter = require('./parseFrontmatter')

const parseStrippedFrontmatter = function (src) {
  src = `---\n${src}\n---`
  return parseFrontmatter(src)
}

const parse = function (src) {
  const output = Utils.parse({
    source: src,
    compiler: require('vue-template-compiler'),
    needMap: false
  })
  const find = output.customBlocks.find(block => block.type === 'frontmatter')
  const frontmatterRaw = find && find.content
  if (frontmatterRaw) {
    return parseStrippedFrontmatter(frontmatterRaw)
  }
  return {}
}

module.exports = {
  parse,
  parseStrippedFrontmatter
}
