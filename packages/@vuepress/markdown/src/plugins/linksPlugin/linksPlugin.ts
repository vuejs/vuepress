import type { PluginWithOptions } from 'markdown-it'
import type * as Token from 'markdown-it/lib/token'
import { isLinkExternal } from '@vuepress/shared'
import type { MarkdownEnv } from '../../types'
import { resolvePaths } from './resolvePaths'

export interface LinksPluginOptions {
  // tag of internal links
  internalTag?: 'a' | 'RouterLink'

  // extra attrs on external links
  externalAttrs?: Record<string, string>
}

/**
 * Process links in markdown file
 *
 * - internal links: convert them into `<RouterLink>`
 * - external links: add extra attrs and add `<OutboundLink/>` before their ending tag
 */
export const linksPlugin: PluginWithOptions<LinksPluginOptions> = (
  md,
  options: LinksPluginOptions = {}
): void => {
  // tag of internal links
  const internalTag = options.internalTag || 'RouterLink'

  // attrs that going to be added to external links
  const externalAttrs = {
    target: '_blank',
    rel: 'noopener noreferrer',
    ...options.externalAttrs,
  }

  let hasOpenRouterLink = false
  let hasOpenExternalLink = false

  const handleLinkOpen = (
    tokens: Token[],
    idx: number,
    env: MarkdownEnv
  ): void => {
    // get current token
    const token = tokens[idx]

    // get `href` attr index
    const hrefIndex = token.attrIndex('href')

    // if `href` attr does not exist, skip
    /* istanbul ignore if */
    if (hrefIndex < 0) {
      return
    }

    // if `href` attr exists, `token.attrs` is not `null`
    const hrefAttr = token.attrs![hrefIndex]
    const hrefLink = hrefAttr[1]

    // get `base` and `filePathRelative` from `env`
    const { base = '/', filePathRelative = null } = env

    // check if a link is an external link
    if (isLinkExternal(hrefLink, base)) {
      // set `externalAttrs` to current token
      Object.entries(externalAttrs).forEach(([key, val]) =>
        token.attrSet(key, val)
      )

      // only when an external link has `target="_blank"`
      // should we add `<OutboundLink/>` before ending tag
      if (/\b_blank\b/i.test(externalAttrs.target)) {
        hasOpenExternalLink = true
      }

      return
    }

    // check if a link is an internal link
    const internalLinkMatch = hrefLink.match(
      /^((?:.*)(?:\/|\.md|\.html))(#.*)?$/
    )
    if (internalLinkMatch) {
      hasOpenRouterLink = true

      // convert
      // <a href="hrefLink">
      // to
      // <RouterLink to="toProp">

      // notice that the path and hash are encoded by markdown-it
      const rawPath = internalLinkMatch[1]
      const rawHash = internalLinkMatch[2] || ''

      // resolve relative and absolute path
      const { relativePath, absolutePath } = resolvePaths(
        rawPath,
        base,
        filePathRelative
      )

      // normalize markdown file path to route path
      //
      // we are removing the `base` from absolute path because it should not be
      // passed to `<RouterLink>`
      //
      // '/foo/index.md' => '/foo/'
      // '/foo/bar.md' => '/foo/bar.html'
      const normalizedPath = absolutePath
        .replace(new RegExp(`^${base}`), '/')
        .replace(/(^|\/)(README|index).md$/i, '$1')
        .replace(/\.md$/, '.html')

      if (internalTag === 'RouterLink') {
        // convert starting tag of internal link to `<RouterLink>`
        token.tag = internalTag
        // replace the original `href` attr with `to` attr
        hrefAttr[0] = 'to'
      }

      hrefAttr[1] = `${normalizedPath}${rawHash}`

      // extract internal links for file / page existence check
      const links = env.links || (env.links = [])
      links.push({
        raw: hrefLink,
        relative: relativePath,
        absolute: absolutePath,
      })
    }
  }

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    handleLinkOpen(tokens, idx, env)
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    // add `<OutboundLink/>` before ending tag of external link
    if (hasOpenExternalLink) {
      hasOpenExternalLink = false
      return '<OutboundLink/>' + self.renderToken(tokens, idx, options)
    }

    // convert ending tag of internal link to `</RouterLink>`
    if (hasOpenRouterLink) {
      hasOpenRouterLink = false
      token.tag = internalTag
    }

    return self.renderToken(tokens, idx, options)
  }
}
