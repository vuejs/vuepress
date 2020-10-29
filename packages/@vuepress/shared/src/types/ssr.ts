import type { HeadConfig } from './head'

/**
 * Context for SSR
 */
export interface VuepressSSRContext {
  lang: string
  head: HeadConfig[]
}
