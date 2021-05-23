import type { PluginWithOptions } from 'markdown-it'
import { decode } from 'mdurl'
import { path } from '@vuepress/utils'
import type { MarkdownEnv } from '../types'

export interface AssetsPluginOptions {
  /**
   * Prefix to add to relative assets links
   */
  relativePathPrefix?: string
}

/**
 * Plugin to handle assets links
 */
export const assetsPlugin: PluginWithOptions<AssetsPluginOptions> = (
  md,
  { relativePathPrefix = '@source' }: AssetsPluginOptions = {}
) => {
  const rawRule = md.renderer.rules.image!

  md.renderer.rules.image = (tokens, idx, options, env: MarkdownEnv, self) => {
    const token = tokens[idx]

    // get the image link
    const link = token.attrGet('src')

    if (!link) {
      return rawRule(tokens, idx, options, env, self)
    }

    // decode link to ensure bundler can find the file correctly
    let resolvedLink = decode(link)

    // if the link is relative path, and the `env.filePathRelative` exists
    // add `@source` alias to the link
    if (/^\.{1,2}\//.test(link) && env.filePathRelative) {
      resolvedLink = `${relativePathPrefix}/${path.join(
        path.dirname(env.filePathRelative),
        resolvedLink
      )}`
    }

    // replace the original link with resolved link
    token.attrSet('src', resolvedLink)

    return rawRule(tokens, idx, options, env, self)
  }
}
