import { isLinkHttp } from './isLinkHttp'

/**
 * Determine a link is absolute link or not
 *
 * - http://github.com/foo/bar
 * - /foo/bar
 */
export const isLinkAbsolute = (link: string): boolean =>
  isLinkHttp(link) || link.startsWith('/')
