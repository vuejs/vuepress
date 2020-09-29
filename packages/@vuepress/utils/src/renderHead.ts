import type { SiteHeadConfig } from '@vuepress/shared'
import { renderHeadAttrs } from './renderHeadAttrs'

/**
 * Render head config to string
 */
export const renderHead = ([
  tag,
  attrs,
  innerHTML = '',
]: SiteHeadConfig): string => {
  const openTag = `<${tag}${renderHeadAttrs(attrs)}>`
  if (tag === 'link' || tag === 'meta' || tag === 'base') {
    return openTag
  }
  return `${openTag}${innerHTML}</${tag}>`
}
