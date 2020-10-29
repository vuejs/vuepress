import type { HeadConfig } from './head'

/**
 * Vuepress page data
 */
export interface PageData {
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
 *
 * Notice that frontmatter is parse from yaml or other languages,
 * so we cannot guarantee the type safety
 */
export interface PageFrontmatter {
  layout?: string | unknown
  permalink?: string | unknown
  permalinkPattern?: string
  date?: string | Date | unknown

  lang?: string | unknown
  title?: string | unknown
  description?: string | unknown
  head?: HeadConfig[] | unknown

  [key: string]: unknown
}

/**
 * Vuepress page header
 */
export interface PageHeader {
  level: number
  title: string
  slug: string
  children: PageHeader[]
}
