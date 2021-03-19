import type { HeadConfig } from './head'

/**
 * Vuepress page data
 */
export type PageData<
  ExtendedPageData extends Record<any, any> = Record<never, never>
> = ExtendedPageData & {
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
   * Language of the page
   */
  lang: string

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
 * Notice that frontmatter is parsed from yaml or other languages,
 * so we cannot guarantee the type safety
 */
export type PageFrontmatter<
  T extends Record<any, any> = Record<string, unknown>
> = Partial<T> & {
  layout?: string
  permalink?: string
  permalinkPattern?: string
  date?: string | Date

  lang?: string
  title?: string
  description?: string
  head?: HeadConfig[]
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
