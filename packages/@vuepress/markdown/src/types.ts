import State = require('markdown-it/lib/rules_core/state_core')
import Token = require('markdown-it/lib/token')

/**
 * Options for markdown-it-anchor
 *
 * @see https://github.com/valeriangalliat/markdown-it-anchor
 */
export interface AnchorPluginOptions {
  /**
   * Minimum level to apply anchors on or array of selected levels
   *
   * @default 1
   */
  level?: number | number[]

  /**
   * A custom slugification function
   */
  slugify?: (str: string) => string

  /**
   * Whether to add permalinks next to titles
   *
   * @default false
   */
  permalink?: boolean

  /**
   * A custom permalink rendering function
   */
  renderPermalink?: (
    slug: string,
    opts: AnchorPluginOptions,
    state: State,
    tokenIndex: number
  ) => void

  /**
   * The class of the permalink anchor
   */
  permalinkClass?: string

  /**
   * Place space between the header text and the permalink anchor
   */
  permalinkSpace?: boolean

  /**
   * The symbol in the permalink anchor
   */
  permalinkSymbol?: string

  /**
   * Place the permalink before the title
   */
  permalinkBefore?: boolean

  /**
   * A custom permalink `href` rendering function
   */
  permalinkHref?: (slug: string, state: State) => string

  /**
   * A custom permalink attributes rendering function
   */
  permalinkAttrs?: (slug: string, state: State) => Record<string, string>

  /**
   * Called with token and info after rendering
   */
  callback?: (token: Token, opts: { slug: string; title: string }) => void
}

/**
 * Options for markdown-it-table-of-contents
 *
 * @see https://github.com/Oktavilla/markdown-it-table-of-contents
 */
export interface TocPluginOptions {
  /**
   * Headings levels to use (2 for h2:s etc)
   */
  includeLevel?: number[]

  /**
   * The class for the container DIV
   */
  containerClass?: string

  /**
   * A custom slugification function
   */
  slugify?: (str: string) => string

  /**
   * Regex pattern of the marker to be replaced with TOC
   */
  markerPattern?: RegExp

  /**
   * Type of list (ul for unordered, ol for ordered)
   */
  listType?: 'ul' | 'ol'

  /**
   * A function for formatting headings
   */
  format?: (str: string) => string

  /**
   * If true, renders all the headers in TOC, even if the headers are in incorrect order
   */
  forceFullToc?: boolean

  /**
   * Optional HTML string for container header
   */
  containerHeaderHtml?: string

  /**
   * Optional HTML string for container footer
   */
  containerFooterHtml?: string

  /**
   * A function for transforming the TOC links
   */
  transformLink?: (str: string) => string
}
