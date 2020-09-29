import type * as MarkdownIt from 'markdown-it'
import { htmlBlock } from './htmlBlock'

/**
 * Replacing the default htmlBlock rule to allow using custom components
 * in markdown
 */
export const customComponentPlugin: MarkdownIt.PluginSimple = (
  md: MarkdownIt
): void => {
  // override default html block ruler
  md.block.ruler.at('html_block', htmlBlock, {
    alt: ['paragraph', 'reference', 'blockquote'],
  })
}
