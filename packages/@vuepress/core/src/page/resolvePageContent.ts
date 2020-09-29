import * as matter from 'gray-matter'
import * as toml from 'toml'
import type { PageFrontmatter } from '../types'

export const resolvePageContent = (
  fileContent: string
): {
  frontmatter: PageFrontmatter
  content: string
  excerpt: string
} => {
  if (!fileContent) {
    return {
      content: '',
      frontmatter: {},
      excerpt: '',
    }
  }

  const {
    data,
    content,
    /* istanbul ignore next */
    excerpt = '',
  } = matter(fileContent, {
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml),
    },
  })

  return {
    frontmatter: data,
    content,
    excerpt,
  }
}
