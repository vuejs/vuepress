module.exports = function parseFrontmatter (content) {
  const matter = require('gray-matter')
  const toml = require('toml')

  return matter(content, {
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml),
      excerpt: false
    }
  })
}
