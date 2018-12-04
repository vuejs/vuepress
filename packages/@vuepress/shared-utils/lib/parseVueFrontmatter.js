const compiler = require('vue-template-compiler')
const { parse } = require('@vue/component-compiler-utils')
const parseFrontmatter = require('./parseFrontmatter')

function parseStrippedFrontmatter (src) {
  src = `---\n${src}\n---`
  return parseFrontmatter(src)
}

module.exports = src => {
  const output = parse({
    source: src,
    compiler,
    needMap: false
  })
  const find = output.customBlocks.find(block => block.type === 'frontmatter')
  const frontmatterRaw = find && find.content
  if (frontmatterRaw) {
    return parseStrippedFrontmatter(frontmatterRaw)
  }
  return {}
}

module.exports.parseStrippedFrontmatter = parseStrippedFrontmatter
