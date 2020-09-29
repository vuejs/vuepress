import type * as MarkdownIt from 'markdown-it'
import { parseHeaderDeeply, slugify } from '../utils'
import type { MarkdownEnv } from '../markdown'

export interface ExtractHeadersPluginOptions {
  includeHeaders?: string[]
}

/**
 * Extracting markdown headers to env
 *
 * Would be used for generating sidebar nav and toc
 */
export const extractHeadersPlugin: MarkdownIt.PluginWithOptions<ExtractHeadersPluginOptions> = (
  md: MarkdownIt,
  { includeHeaders = ['h2', 'h3'] }: ExtractHeadersPluginOptions = {}
): void => {
  if (includeHeaders.length === 0) {
    return
  }

  md.renderer.rules.heading_open = (
    tokens,
    i,
    options,
    env: MarkdownEnv,
    self
  ) => {
    const token = tokens[i]

    if (includeHeaders.includes(token.tag)) {
      const title = tokens[i + 1].content
      const idAttr = token.attrs?.find(([name]) => name === 'id')
      const slug = idAttr?.[1]
      const headers = env.headers || (env.headers = [])

      headers.push({
        level: parseInt(token.tag.slice(1), 10),
        title: parseHeaderDeeply(title),
        slug: slug || slugify(title),
      })
    }
    return self.renderToken(tokens, i, options)
  }
}
