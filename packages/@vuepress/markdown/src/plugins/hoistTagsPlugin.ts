import type { PluginWithOptions } from 'markdown-it'
import type { MarkdownEnv } from '../types'

export interface HoistTagsPluginOptions {
  // custom blocks to be hoisted
  customBlocks?: string[]
}

/**
 * Avoid rendering vue SFC script / style blocks
 *
 * Extract them into env
 *
 * Hoist them to vue SFC root level in following process
 */
export const hoistTagsPlugin: PluginWithOptions<HoistTagsPluginOptions> = (
  md,
  { customBlocks = [] }: HoistTagsPluginOptions = {}
): void => {
  // hoist <script>, <style> and other user defined tags
  const hoistTags = Array.from(new Set(['script', 'style', ...customBlocks]))
  const hoistTagsRegexp = new RegExp(
    `^<(${hoistTags.join('|')})(?=(\\s|>|$))`,
    'i'
  )

  md.renderer.rules.html_block = (tokens, idx, _, env: MarkdownEnv) => {
    const content = tokens[idx].content
    const hoistedTags = env.hoistedTags || (env.hoistedTags = [])

    // record the hoisted tags to env and do not render them
    if (hoistTagsRegexp.test(content.trim())) {
      hoistedTags.push(content)
      return ''
    }

    return content
  }
}
