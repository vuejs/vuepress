import { computed, inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import { useRoute } from 'vue-router'
import {
  usePageData,
  usePageFrontmatter,
  useThemeLocaleData,
} from '@vuepress/client'
import type { PageHeader } from '@vuepress/client'
import { isArray, isPlainObject, resolveLocalePath } from '@vuepress/shared'
import type {
  DefaultThemeOptions,
  NavItem,
  SidebarConfigArray,
  SidebarConfigObject,
} from '../../types'

export type ResolvedSidebarConfig = DefaultThemeOptions['sidebar']

/**
 * A common type for sidebar items, only for internal usage
 *
 * - Link or not
 * - Group or not
 * - ...
 */
export interface ResolvedSidebarItem extends NavItem {
  link?: string
  isGroup?: boolean
  children?: ResolvedSidebarItem[]
}

export type SidebarItemsRef = ComputedRef<ResolvedSidebarItem[]>

export const sidebarItemsSymbol: InjectionKey<SidebarItemsRef> = Symbol(
  'sidebarItems'
)

/**
 * Inject sidebar items global computed
 */
export const useSidebarItems = (): SidebarItemsRef => {
  const sidebarItems = inject(sidebarItemsSymbol)
  if (!sidebarItems) {
    throw new Error('useSidebarItems() is called without provider.')
  }
  return sidebarItems
}

/**
 * Resolve sidebar items global computed
 *
 * It should only be resolved and provided once
 */
export const resolveSidebarItems = (): SidebarItemsRef => {
  const frontmatter = usePageFrontmatter()
  const themeLocale = useThemeLocaleData<DefaultThemeOptions>()

  const sidebarConfig = computed(
    () =>
      (frontmatter.value.sidebar as ResolvedSidebarConfig) ||
      themeLocale.value.sidebar
  )
  const sidebarItems = computed<ResolvedSidebarItem[]>(() => {
    if (frontmatter.value.home === true || sidebarConfig.value === false) {
      return []
    }

    if (sidebarConfig.value === 'auto') {
      return resolveAutoSidebarItems()
    }

    if (isArray(sidebarConfig.value)) {
      return resolveArraySidebarItems(sidebarConfig.value)
    }

    if (isPlainObject(sidebarConfig.value)) {
      return resolveMultiSidebarItems(sidebarConfig.value)
    }

    return []
  })

  return sidebarItems
}

/**
 * Util to transform page header to sidebar item
 */
export const headerToSidebarItem = (
  header: PageHeader
): ResolvedSidebarItem => ({
  text: header.title,
  link: `#${header.slug}`,
  children: header.children.map(headerToSidebarItem),
})

/**
 * Resolve sidebar items if the config is `auto`
 */
export const resolveAutoSidebarItems = (): ResolvedSidebarItem[] => {
  const page = usePageData()

  return [
    {
      isGroup: true,
      text: page.value.title,
      children: page.value.headers.map(headerToSidebarItem),
    },
  ]
}

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = (
  sidebarConfig: SidebarConfigArray
): ResolvedSidebarItem[] => {
  const route = useRoute()
  const page = usePageData()

  return sidebarConfig.map((item: ResolvedSidebarItem) => {
    if (!item.isGroup) {
      return item
    }

    return {
      ...item,
      children: item.children?.map((subItem: ResolvedSidebarItem) => {
        if (subItem.link !== route.path || subItem.children !== undefined) {
          return subItem
        }
        return {
          ...subItem,
          children: page.value.headers.map(headerToSidebarItem),
        }
      }),
    }
  })
}

/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSidebarItems = (
  sidebarConfig: SidebarConfigObject
): ResolvedSidebarItem[] => {
  const route = useRoute()
  const sidebarPath = resolveLocalePath(sidebarConfig, route.path)
  const matchedSidebarConfig = sidebarConfig[sidebarPath] ?? []

  return resolveArraySidebarItems(matchedSidebarConfig)
}
