const matter = require('gray-matter')
const toml = require('toml')

module.exports = function parseFrontmatter (content) {
  return matter(content, {
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml),
      excerpt: false
    }
  })
}
