const matter = require('gray-matter')
const toml = require('toml')

export = function parseFrontmatter (content: string) {
  return matter(content, {
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml),
      excerpt: false
    }
  })
}
