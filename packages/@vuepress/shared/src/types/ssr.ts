import type { HeadConfig } from './head'

/**
 * Context for SSR
 */
export interface VuepressSSRContext {
  title: string
  lang: string
  head: HeadConfig[]
}
