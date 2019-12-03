import matter from 'gray-matter'
import toml from 'toml'

export = function parseFrontmatter (content: string) {
  return matter(content, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml)
    }
  })
}
