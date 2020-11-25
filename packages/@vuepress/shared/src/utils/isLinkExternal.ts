import { isLinkHttp } from './isLinkHttp'

/**
 * Determine a link is external or not
 */
export const isLinkExternal = (link: string, base = '/'): boolean => {
  // http link
  if (isLinkHttp(link)) {
    return true
  }

  // absolute link that does not start with `base`
  if (link.startsWith('/') && !link.startsWith(base)) {
    return true
  }

  return false
}
