import { Plugins } from './options'

export interface MarkdownOptions {
  // TODO: markdown-it typings support
  /**
   * A function to modify default config or apply additional plugins
   * to the markdown-it instance used to render source files.
   * @param markdown an instance of `MarkdownIt`
   */
  extendMarkdown?(markdown: any): void

  /**
   * Modify the internal markdown config with markdown-it-chain.
   * @param config an instance of `ChainableConfig` for markdown-it
   */
  chainMarkdown?(config: any): void
}

export interface MarkdownConfig extends MarkdownOptions {
  /**
   * Whether to show line numbers to the left of each code blocks.
   */
  lineNumbers?: boolean

  /**
   * Function for transforming header texts into slugs.
   * @param header header texts
   */
  slugify?: (header: string) => string

  /**
   * Options for `markdown-it-anchor`.
   * Note: prefer `markdown.slugify` if you want to customize header ids.
   */
  anchor: any

  /**
   * The key and value pair will be added to `<a>` tags that point to an external link.
   */
  externalLinks: Record<string, string>

  /**
   * You can install any `markdown-it` plugin through `markdown.plugins` option.
   */
  plugins: Plugins
}
