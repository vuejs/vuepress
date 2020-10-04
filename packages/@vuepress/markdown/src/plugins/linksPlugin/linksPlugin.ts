import type * as MarkdownIt from 'markdown-it'
import type * as Token from 'markdown-it/lib/token'
import type { MarkdownEnv } from '../../markdown'
import { isExternalLink } from './isExternalLink'
import { resolvePaths } from './resolvePaths'

export interface LinksPluginOptions {
  // extra attrs on external links
  externalAttrs?: Record<string, string>
}

/**
 * Process links in markdown file
 *
 * - internal links: convert them into `<RouterLink>`
 * - external links: add extra attrs and add `<OutboundLink/>` before their ending tag
 */
export const linksPlugin: MarkdownIt.PluginWithOptions<LinksPluginOptions> = (
  md: MarkdownIt,
  options: LinksPluginOptions = {}
): void => {
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
    if (isExternalLink(hrefLink, base)) {
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

      // markdown-it encodes the uri
      const decodedPath = decodeURI(internalLinkMatch[1])
      const decodedHash = internalLinkMatch[2]
        ? decodeURI(internalLinkMatch[2])
        : ''

      // resolve relative and absolute path
      const { relativePath, absolutePath } = resolvePaths(
        decodedPath,
        base,
        filePathRelative
      )

      // normalize markdown file path
      //
      // './foo/bar.md' => './foo/bar.html'
      // './foo/index.md' => './foo/'
      const indexMatch = absolutePath.match(/(^.*\/|^)(index|readme).md$/i)
      let normalizedPath: string

      if (indexMatch) {
        // trim index page link
        normalizedPath = indexMatch[1]
      } else {
        // convert non-index page link
        normalizedPath = absolutePath.replace(/\.md$/, '.html')
      }

      // extract internal links for file / page existence check
      const links = env.links || (env.links = [])
      links.push({
        raw: hrefLink,
        relative: relativePath,
        absolute: absolutePath,
      })

      // convert starting tag of internal link to `<RouterLink>`
      token.tag = 'RouterLink'

      // replace the original `href` attr with `to` attr
      hrefAttr[0] = 'to'
      hrefAttr[1] = `${normalizedPath}${decodedHash}`
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
      token.tag = 'RouterLink'
    }

    return self.renderToken(tokens, idx, options)
  }
}
