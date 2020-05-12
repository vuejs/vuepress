import { extractHeaders } from '@vuepress/shared-utils'
import { App } from '../app'

export interface PageHeader {
  level: number
  title: string
  slug: string
}

export const resolvePageHeaders = (app: App, content: string): PageHeader[] => {
  // TODO: include headers level
  return extractHeaders(content, ['h2', 'h3'], app.markdown) as PageHeader[]
}
