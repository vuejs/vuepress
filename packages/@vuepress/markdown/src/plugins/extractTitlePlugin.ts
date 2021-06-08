import type { PluginSimple } from 'markdown-it'
import { resolveTitleFromToken } from '../utils'
import type { MarkdownEnv } from '../types'

/**
 * Extracting markdown title to env
 */
export const extractTitlePlugin: PluginSimple = (md): void => {
  let title: string

  // push the rule to the end of the chain
  // resolve title from the parsed tokens
  md.core.ruler.push('resolveExtractTitle', (state) => {
    const tokenIdx = state.tokens.findIndex((token) => token.tag === 'h1')
    if (tokenIdx > -1) {
      title = resolveTitleFromToken(state.tokens[tokenIdx + 1], {
        escapeText: false,
        allowHtml: false,
      })
    } else {
      title = ''
    }
    return true
  })

  // extract title to env
  const render = md.render.bind(md)
  md.render = (src, env: MarkdownEnv = {}) => {
    const result = render(src, env)
    env.title = env.frontmatter?.title ?? title
    return result
  }
}
