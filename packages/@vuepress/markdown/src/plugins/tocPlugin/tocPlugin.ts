import type { PluginWithOptions } from 'markdown-it'
import type { MarkdownHeader } from '../../types'
import {
  resolveHeadersFromTokens,
  slugify as slugifyDefault,
} from '../../utils'
import { createRenderHeaders } from './createRenderHeaders'
import { createTocBlockRule } from './createTocBlockRule'

export interface TocPluginOptions {
  /**
   * The pattern serving as the TOC placeholder in your markdown
   */
  pattern?: RegExp

  /**
   * A custom slugify function
   *
   * Should use the same slugify function with markdown-it-anchor
   * to ensure the link is matched
   */
  slugify?: (str: string) => string

  /**
   * A function for formatting headers
   */
  format?: (str: string) => string

  /**
   * Heading level that going to be extracted to the `env`
   *
   * Should be a subset of markdown-it-anchor's `level` option
   * to ensure the link is existed
   */
  level?: number[]

  /**
   * HTML tag of container
   */
  containerTag?: string

  /**
   * The class for container
   */
  containerClass?: string

  /**
   * HTML tag of list
   */
  listTag?: 'ul' | 'ol'

  /**
   * The class for list
   */
  listClass?: string

  /**
   * The class for the <li> tag
   */
  itemClass?: string

  /**
   * The tag for the link inside <li>
   */
  linkTag?: 'a' | 'RouterLink'

  /**
   * The class for the link tag inside <li>
   */
  linkClass?: string
}

/**
 * Generate table of contents
 *
 * Forked and modified from markdown-it-toc-done-right:
 *
 * - Allows `html_inline` tags in headings to support vue components
 * - Allows render `<RouterLink>` instead of `<a>` for links
 * - Code refactor and optimizations
 *
 * @see https://github.com/nagaozen/markdown-it-toc-done-right
 */
export const tocPlugin: PluginWithOptions<TocPluginOptions> = (
  md,
  {
    pattern = /^\[\[toc\]\]$/i,
    slugify = slugifyDefault,
    format,
    level = [2, 3],
    containerTag = 'nav',
    containerClass = 'table-of-contents',
    listTag = 'ul',
    listClass = '',
    itemClass = '',
    linkTag = 'a',
    linkClass = '',
  }: TocPluginOptions = {}
): void => {
  let headers: MarkdownHeader[]

  // push the rule to the end of the chain
  // resolve headers from the parsed tokens
  md.core.ruler.push('resolveTocHeaders', (state) => {
    headers = resolveHeadersFromTokens(state.tokens, {
      level,
      allowHtml: true,
      escapeText: true,
      slugify,
      format,
    })
    return true
  })

  // add toc syntax as a block rule
  md.block.ruler.before(
    'heading',
    'toc',
    createTocBlockRule({
      pattern,
      containerTag,
      containerClass,
    }),
    {
      alt: ['paragraph', 'reference', 'blockquote'],
    }
  )

  const renderHeaders = createRenderHeaders({
    listTag,
    listClass,
    itemClass,
    linkTag,
    linkClass,
  })

  // custom toc_body render rule
  md.renderer.rules.toc_body = () => {
    /* istanbul ignore if */
    if (!headers) {
      return ''
    }

    return renderHeaders(headers)
  }
}
