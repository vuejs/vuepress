import type { PluginWithOptions } from 'markdown-it'
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

    // if the link is relative path, and the `env.filePathRelative` exists
    if (link && /^\.{1,2}\//.test(link) && env.filePathRelative) {
      // add `@source` alias to the link
      const resolvedLink = `${relativePathPrefix}/${path.join(
        path.dirname(env.filePathRelative),
        link
      )}`

      // replace the original link with absolute path
      token.attrSet('src', resolvedLink)
    }

    return rawRule(tokens, idx, options, env, self)
  }
}
