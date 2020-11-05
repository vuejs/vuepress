import { useSiteData } from '../injections'

/**
 * Prefix url with site base
 */
export const withBase = (url: string): string => {
  const base = useSiteData().value.base
  return `${base}${url}`.replace(/\/+/, '/')
}
