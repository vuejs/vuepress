export default interface Frontmatter extends Record<string, any> {
  title?: string
  lang?: string
  description?: string
  layout?: string
  permalink?: string
  metaTitle?: string
  meta?: {
    name: string
    content: string
  }[]
}
