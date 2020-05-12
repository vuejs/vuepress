import { hash } from '@vuepress/utils'

export const resolvePageKey = (identifier: string): string =>
  `v-${hash(identifier)}`
