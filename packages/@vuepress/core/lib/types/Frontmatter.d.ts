export default interface Frontmatter extends Record<string, any> {
  /**
   * title of current page 
   */
  title?: string

  /**
   * language of current page 
   */
  lang?: string

  /**
   * description of current page 
   */
  description?: string

  /**
   * layout component of current page 
   */
  layout?: string

  /**
   * permalink pattern of current page 
   */
  permalink?: string

  /**
   * override the default meta title 
   */
  metaTitle?: string

  /**
   * extra meta tags to be injected 
   */
  meta?: {
    name: string
    content: string
  }[]
}
