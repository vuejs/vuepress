import type { PluginWithOptions } from 'markdown-it'
import * as rawAnchorPlugin from 'markdown-it-anchor'

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

export const anchorPlugin: PluginWithOptions<AnchorPluginOptions> = rawAnchorPlugin as PluginWithOptions<AnchorPluginOptions>
