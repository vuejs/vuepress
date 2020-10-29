import * as MarkdownIt from 'markdown-it'
import { tocPlugin } from './plugins/tocPlugin/tocPlugin'
import {
  anchorPlugin,
  codePlugin,
  customComponentPlugin,
  emojiPlugin,
  extractHeadersPlugin,
  hoistTagsPlugin,
  linksPlugin,
} from './plugins'
import type { Markdown, MarkdownOptions } from './types'
import { slugify } from './utils'

/**
 * Create vuepress customized markdown-it instance
 */
export const createMarkdown = ({
  anchor,
  code,
  emoji,
  extractHeaders,
  hoistTags,
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

  // following plugins push rules to the end of chain, so the order
  // of them is important
  md
    // parse emoji (before anchor and toc plugin)
    .use(emojiPlugin, {
      ...emoji,
    })
    // add anchor to headers
    .use(anchorPlugin, {
      level: [1, 2, 3, 4, 5, 6],
      slugify,
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#',
      ...anchor,
    })
    // allow toc syntax (after anchor plugin)
    .use(tocPlugin, {
      level: [2, 3],
      slugify,
      linkTag: 'RouterLink',
      ...toc,
    })
    // extract headers into env (after anchor plugin)
    .use(extractHeadersPlugin, {
      level: [2, 3],
      slugify,
      ...extractHeaders,
    })

  // following plugins modify or replace the rule in place
  // and have no conflicts, so the order is not important
  md
    // treat unknown html tags as custom components
    .use(customComponentPlugin)
    // hoist vue SFC blocks and extract them into env
    .use(hoistTagsPlugin, hoistTags)
    // process external and internal links
    .use(linksPlugin, links)
    // process code fence
    .use(codePlugin, code)

  return md
}
