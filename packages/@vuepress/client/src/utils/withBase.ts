import { isLinkHttp } from '@vuepress/shared'
import { useSiteData } from '../injections'

/**
 * Prefix url with site base
 */
export const withBase = (url: string): string => {
  if (isLinkHttp(url)) return url
  const base = useSiteData().value.base
  return `${base}${url}`.replace(/\/+/, '/')
}
