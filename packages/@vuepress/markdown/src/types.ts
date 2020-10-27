import * as MarkdownIt from 'markdown-it'
import type { PageHeader } from '@vuepress/shared'
import type {
  AnchorPluginOptions,
  EmojiPluginOptions,
  ExtractHeadersPluginOptions,
  HoistTagsPluginOptions,
  LinksPluginOptions,
  TocPluginOptions,
} from './plugins'

export type Markdown = MarkdownIt

export interface MarkdownOptions extends MarkdownIt.Options {
  anchor?: AnchorPluginOptions
  emoji?: EmojiPluginOptions
  extractHeaders?: ExtractHeadersPluginOptions
  hoistTags?: HoistTagsPluginOptions
  links?: LinksPluginOptions
  toc?: TocPluginOptions
}

/**
 * Headers in markdown file
 */
export type MarkdownHeader = PageHeader

/**
 * Internal links in markdown file
 *
 * Used for file existence check
 */
export interface MarkdownLink {
  raw: string
  relative: string
  absolute: string
}

/**
 * The `env` object to be passed to markdown-it render function
 *
 * Input some meta data for markdown file parsing and rendering
 *
 * Output some resources from the markdown file
 */
export interface MarkdownEnv {
  // Input

  /**
   * Base / publicPath of current site
   */
  base?: string

  /**
   * Relative file path of the markdown file
   */
  filePathRelative?: string | null

  // Output

  /**
   * Headers that extracted by extractHeadersPlugin
   */
  headers?: MarkdownHeader[]

  /**
   * Hoisted tags that extracted by hoistTagsPlugin
   */
  hoistedTags?: string[]

  /**
   * Links that extracted by linksPlugin
   */
  links?: MarkdownLink[]
}
