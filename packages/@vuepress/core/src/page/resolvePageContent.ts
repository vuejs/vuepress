import * as matter from 'gray-matter'
import * as toml from 'toml'
import type { PageFrontmatter } from '../types'

/**
 * Resolve page content and raw frontmatter & excerpt
 */
export const resolvePageContent = ({
  contentRaw,
}: {
  contentRaw: string
}): {
  content: string
  frontmatterRaw: PageFrontmatter
  excerptRaw: string
} => {
  if (!contentRaw) {
    return {
      content: '',
      frontmatterRaw: {},
      excerptRaw: '',
    }
  }

  const {
    data,
    content,
    /* istanbul ignore next */
    excerpt = '',
  } = matter(contentRaw, {
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml),
    },
  })

  return {
    content,
    frontmatterRaw: data,
    excerptRaw: excerpt,
  }
}
