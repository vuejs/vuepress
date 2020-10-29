import type { HeadAttrsConfig } from '@vuepress/shared'

/**
 * Render head attrs config to string
 */
export const renderHeadAttrs = (attrs: HeadAttrsConfig): string =>
  Object.entries(attrs)
    .filter((item): item is [string, string | true] => item[1] !== false)
    .map(([key, value]) =>
      value === true ? ` ${key}` : ` ${key}="${attrs[key]}"`
    )
    .join('')
