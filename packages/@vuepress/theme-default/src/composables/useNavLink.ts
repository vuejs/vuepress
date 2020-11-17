import { useResolveRouteWithRedirect } from './useResolveRouteWithRedirect'
import type { NavLink } from '../types'

/**
 * Resolve NavLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const useNavLink = (item: string): NavLink => {
  const resolved = useResolveRouteWithRedirect(item)
  return {
    text: resolved.meta.title || item,
    link: resolved.name === '404' ? item : resolved.fullPath,
  }
}
