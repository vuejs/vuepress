import { Page } from '../page'
import { App } from './createApp'

export interface ClientData {
  title: string
  description: string
  base: string
  pages: ClientDataPage[]
}

export type ClientDataPage = Pick<
  Page,
  'key' | 'path' | 'title' | 'frontmatter' | 'excerpt' | 'headers'
>

/**
 * Create data from app, which will be used in client
 */
export const createClientData = (app: App): ClientData => {
  return {
    title: app.options.title,
    description: app.options.description,
    base: app.options.base,
    pages: app.pages.map(
      ({ key, path, title, frontmatter, excerpt, headers }) => ({
        key,
        path,
        title,
        frontmatter,
        excerpt,
        headers,
      })
    ),
  }
}
