import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import {
  usePageData,
  usePageFrontmatter,
  useThemeLocaleData,
} from '@vuepress/client'
import type { PageHeader } from '@vuepress/client'
import { isPlainObject, resolveLocalePath } from '@vuepress/shared'
import type {
  DefaultThemeOptions,
  NavItem,
  SidebarConfigObject,
} from '../../types'

export type ResolvedSidebarConfig = DefaultThemeOptions['sidebar']

export interface ResolvedSidebarItem extends NavItem {
  link?: string
  isGroup?: boolean
  collapsable?: boolean
  children?: ResolvedSidebarItem[]
}

export const useSidebarItems = (): ComputedRef<ResolvedSidebarItem[]> => {
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
      return useAutoSidebarItems()
    }

    if (isPlainObject(sidebarConfig.value)) {
      return useMultiSidebarItems(sidebarConfig.value as SidebarConfigObject)
    }

    return []
  })

  return sidebarItems
}

export const headerToSidebarItem = (
  header: PageHeader
): ResolvedSidebarItem => ({
  text: header.title,
  link: `#${header.slug}`,
  children: header.children.map(headerToSidebarItem),
})

export const useAutoSidebarItems = (): ResolvedSidebarItem[] => {
  const page = usePageData()

  return [
    {
      isGroup: true,
      collapsable: false,
      text: page.value.title,
      children: page.value.headers.map(headerToSidebarItem),
    },
  ]
}

export const useMultiSidebarItems = (
  sidebarConfig: SidebarConfigObject
): ResolvedSidebarItem[] => {
  const route = useRoute()
  const page = usePageData()
  const sidebarPath = resolveLocalePath(sidebarConfig, route.path)
  const matchedSidebarConfig = sidebarConfig[sidebarPath] ?? []

  return matchedSidebarConfig.map((item: ResolvedSidebarItem) => {
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
