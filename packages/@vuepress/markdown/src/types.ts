import * as MarkdownIt from 'markdown-it'
import type { PageFrontmatter, PageHeader } from '@vuepress/shared'
import type {
  AnchorPluginOptions,
  AssetsPluginOptions,
  CodePluginOptions,
  EmojiPluginOptions,
  ExtractHeadersPluginOptions,
  HoistTagsPluginOptions,
  LinksPluginOptions,
  TocPluginOptions,
} from './plugins'

export type Markdown = MarkdownIt

export interface MarkdownOptions extends MarkdownIt.Options {
  anchor?: false | AnchorPluginOptions
  assets?: false | AssetsPluginOptions
  code?: false | CodePluginOptions
  customComponent?: false
  emoji?: false | EmojiPluginOptions
  extractHeaders?: false | ExtractHeadersPluginOptions
  hoistTags?: false | HoistTagsPluginOptions
  links?: false | LinksPluginOptions
  toc?: false | TocPluginOptions
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

  /**
   * Frontmatter of the markdown file
   */
  frontmatter?: PageFrontmatter

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
