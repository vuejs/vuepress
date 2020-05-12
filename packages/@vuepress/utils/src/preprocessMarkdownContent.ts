import * as matter from 'gray-matter'
import * as toml from 'toml'

export interface PreprocessMarkdownContentResult {
  content: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frontmatter: Record<string, any>
  excerpt: string
}

export const preprocessMarkdownContent = (
  rawContent: string
): PreprocessMarkdownContentResult => {
  // `excerpt` won't be `undefined` with our options
  // so here we add /* istanbul ignore next */
  // to ignore `excerpt = ''` branch

  /* istanbul ignore next */
  const { content, data, excerpt = '' } = matter(rawContent, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml),
    },
  })

  return {
    content,
    frontmatter: data,
    excerpt,
  }
}
