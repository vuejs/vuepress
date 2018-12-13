export = function parseFrontmatter (content: string) {
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
