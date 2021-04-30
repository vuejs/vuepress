import * as MarkdownIt from 'markdown-it'
import {
  anchorPlugin,
  assetsPlugin,
  codePlugin,
  customComponentPlugin,
  emojiPlugin,
  extractHeadersPlugin,
  hoistTagsPlugin,
  importCodePlugin,
  linksPlugin,
  tocPlugin,
} from './plugins'
import type { Markdown, MarkdownOptions } from './types'
import { slugify } from './utils'

/**
 * Create vuepress customized markdown-it instance
 */
export const createMarkdown = ({
  anchor,
  assets,
  code,
  customComponent,
  emoji,
  extractHeaders,
  hoistTags,
  importCode,
  links,
  toc,
  ...markdownItOptions
}: MarkdownOptions = {}): Markdown => {
  // create raw markdown-it instance
  const md = MarkdownIt({
    ...markdownItOptions,
    // should always enable html option
    html: true,
  })

  // =====================================================
  // following plugins push rules to the end of chain, so
  // the order to use them is important

  // parse emoji (before anchor and toc plugin)
  if (emoji !== false) {
    md.use(emojiPlugin, emoji)
  }

  // add anchor to headers
  if (anchor !== false) {
    md.use(anchorPlugin, {
      level: [1, 2, 3, 4, 5, 6],
      slugify,
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#',
      ...anchor,
    })
  }

  // allow toc syntax (after anchor plugin)
  if (toc !== false) {
    md.use(tocPlugin, {
      level: [2, 3],
      slugify,
      linkTag: 'RouterLink',
      ...toc,
    })
  }

  // extract headers into env (after anchor plugin)
  if (extractHeaders !== false) {
    md.use(extractHeadersPlugin, {
      level: [2, 3],
      slugify,
      ...extractHeaders,
    })
  }

  // =====================================================
  // following plugins modify or replace the rule in place
  // and have no conflicts, so the order is not important

  // treat unknown html tags as custom components
  if (customComponent !== false) {
    md.use(customComponentPlugin)
  }

  // replace relative link of assets with absolute link
  if (assets !== false) {
    md.use(assetsPlugin, assets)
  }

  // hoist vue SFC blocks and extract them into env
  if (hoistTags !== false) {
    md.use(hoistTagsPlugin, hoistTags)
  }

  // process external and internal links
  if (links !== false) {
    md.use(linksPlugin, links)
  }

  // process code fence
  if (code !== false) {
    md.use(codePlugin, code)
  }

  // handle import_code syntax
  if (importCode !== false) {
    md.use(importCodePlugin, importCode)
  }

  return md
}
