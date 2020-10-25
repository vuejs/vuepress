/**
 * Options for markdown-it-toc-done-right
 *
 * @see https://github.com/nagaozen/markdown-it-toc-done-right#options
 */
export interface TocPluginOptions {
  /**
   * The pattern serving as the TOC placeholder in your markdown
   */
  placeholder?: string

  /**
   * A custom slugification function
   */
  slugify?: (str: string) => string

  /**
   * The class for the container DIV
   *
   * @default 'table-of-contents'
   */
  containerClass?: string

  /**
   * The ID for the container DIV
   *
   * @default undefined
   */
  containerId?: string

  /**
   * The class for the listType HTMLElement
   *
   * @default undefined
   */
  listClass?: string

  /**
   * The class for the LI
   *
   * @default undefined
   */
  itemClass?: string

  /**
   * Minimum level to apply anchors on or array of selected levels
   *
   * @default 1
   */
  level?: number | number[]

  /**
   * Type of list (ul for unordered, ol for ordered)
   *
   * @default 'ol'
   */
  listType?: 'ul' | 'ol'

  /**
   * A function for formatting headings
   *
   * @default undefined
   */
  format?: (str: string) => string

  /**
   * A function for transforming the TOC links
   *
   * @default undefined
   */
  callback?: (html: string, ast: TocPluginAstNode) => void
}

export interface TocPluginAstNode {
  l: number
  n: string
  c: TocPluginAstNode[]
}
