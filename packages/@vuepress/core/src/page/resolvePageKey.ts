import { hash } from '@vuepress/utils'

/**
 * Resolve page key to identify the page
 */
export const resolvePageKey = ({ path }: { path: string }): string =>
  `v-${hash(path)}`
