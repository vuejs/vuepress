/**
 * Vuepress base page
 */
export interface BasePage {
  /**
   * Identifier of the page
   *
   * Will also be used as the component name
   *
   * @example 'v-foobar'
   */
  key: string

  /**
   * Route path of the page
   *
   * Firstly inferred from the file path
   *
   * Might be overridden by permalink
   *
   * @example '/guide/index.html'
   * @example '/2020/02/02/hello-world.html'
   */
  path: string

  /**
   * Title of the page
   */
  title: string

  /**
   * Front matter of the page
   */
  frontmatter: PageFrontmatter

  /**
   * Excerpt of the page
   */
  excerpt: string

  /**
   * Headers of the page
   */
  headers: PageHeader[]
}

/**
 * Vuepress page frontmatter
 */
export type PageFrontmatter = Record<string, unknown>

/**
 * Vuepress page header
 */
export interface PageHeader {
  level: number
  title: string
  slug: string
}
