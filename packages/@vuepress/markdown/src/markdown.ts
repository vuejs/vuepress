import * as MarkdownIt from 'markdown-it'
import * as anchorPlugin from 'markdown-it-anchor'
import * as emojiPlugin from 'markdown-it-emoji'
import * as tocPlugin from 'markdown-it-toc-done-right'
import type { PageHeader } from '@vuepress/shared'
import {
  customComponentPlugin,
  extractHeadersPlugin,
  hoistTagsPlugin,
  linksPlugin,
} from './plugins'
import type {
  ExtractHeadersPluginOptions,
  HoistTagsPluginOptions,
  LinksPluginOptions,
} from './plugins'
import type { AnchorPluginOptions, TocPluginOptions } from './types'
import { slugify, parseHeader } from './utils'

export type Markdown = MarkdownIt

export interface MarkdownOptions extends MarkdownIt.Options {
  anchor?: AnchorPluginOptions
  toc?: TocPluginOptions
  extractHeaders?: ExtractHeadersPluginOptions
  hoistTags?: HoistTagsPluginOptions
  links?: LinksPluginOptions
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

/**
 * Create vuepress customized markdown-it instance
 */
export const createMarkdown = ({
  anchor,
  toc,
  extractHeaders,
  hoistTags,
  links,
  ...markdownItOptions
}: MarkdownOptions = {}): Markdown => {
  // create raw markdown-it instance
  const md = MarkdownIt({
    ...markdownItOptions,
    // should always enable html option
    html: true,
  })

  // use plugins
  md
    // treat unknown html tags as custom components
    .use(customComponentPlugin)
    // extract headers into env
    .use(extractHeadersPlugin, extractHeaders)
    // hoist vue SFC blocks and extract them into env
    .use(hoistTagsPlugin, hoistTags)
    // process external and internal links
    .use(linksPlugin, links)
    // add anchor to headers
    .use(anchorPlugin, {
      slugify,
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#',
      ...anchor,
    } as AnchorPluginOptions)
    // allow toc syntax
    .use(tocPlugin, {
      slugify,
      listType: 'ul',
      // allow html blocks in toc headers
      format: parseHeader,
      ...toc,
    } as TocPluginOptions)
    // parse emoji
    // NOTICE: do not put emojiPlugin between anchorPlugin and tocPlugin
    // because they need to use the same raw string for `slugify`
    .use(emojiPlugin)

  return md
}
