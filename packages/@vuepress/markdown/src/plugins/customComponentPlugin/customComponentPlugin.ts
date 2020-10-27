import type { PluginSimple } from 'markdown-it'
import { htmlBlockRule } from './htmlBlockRule'

/**
 * Replacing the default htmlBlock rule to allow using custom components
 * in markdown
 */
export const customComponentPlugin: PluginSimple = (md): void => {
  // override default html block ruler
  md.block.ruler.at('html_block', htmlBlockRule, {
    alt: ['paragraph', 'reference', 'blockquote'],
  })
}
