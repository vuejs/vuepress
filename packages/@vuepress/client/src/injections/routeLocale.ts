import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import { resolveLocalePath } from '@vuepress/shared'
import type { SiteData } from '@vuepress/shared'

export type RouteLocale = string

export type RouteLocaleRef = ComputedRef<RouteLocale>

export const routeLocaleSymbol: InjectionKey<RouteLocaleRef> = Symbol(
  __DEV__ ? 'routeLocale' : ''
)

export const useRouteLocale = (): RouteLocaleRef => {
  const routeLocale = inject(routeLocaleSymbol)
  if (!routeLocale) {
    throw new Error('useRouteLocale() is called without provider.')
  }
  return routeLocale
}

/**
 * Resolve locale path of the route path
 */
export const resolveRouteLocale = (
  locales: SiteData['locales'],
  routePath: string
): RouteLocale => resolveLocalePath(locales, routePath)
