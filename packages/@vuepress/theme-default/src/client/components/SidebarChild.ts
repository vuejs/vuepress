import { h } from 'vue'
import type { FunctionalComponent, VNode } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ResolvedSidebarItem } from '../../shared'
import NavLink from './NavLink.vue'

const normalizePath = (path: string): string =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(md|html)$/, '')

const isActiveLink = (
  route: RouteLocationNormalizedLoaded,
  link?: string
): boolean => {
  if (link === undefined) {
    return false
  }

  if (route.hash === link) {
    return true
  }

  const currentPath = normalizePath(route.path)
  const targetPath = normalizePath(link)

  return currentPath === targetPath
}

const isActiveItem = (
  route: RouteLocationNormalizedLoaded,
  item: ResolvedSidebarItem
): boolean => {
  if (isActiveLink(route, item.link)) {
    return true
  }

  if (item.children) {
    return item.children.some((child) => isActiveItem(route, child))
  }

  return false
}

const renderItem = (
  item: ResolvedSidebarItem,
  props: VNode['props']
): VNode => {
  // if the item has link, render it as `<NavLink>`
  if (item.link) {
    return h(NavLink, {
      ...props,
      item,
    })
  }

  // if the item only has text, render it as `<p>`
  return h('p', props, item.text)
}

const renderChildren = (
  item: ResolvedSidebarItem,
  depth: number
): VNode | null => {
  if (!item.children?.length) {
    return null
  }

  return h(
    'ul',
    {
      class: {
        'sidebar-sub-headers': depth > 0,
      },
    },
    item.children.map((child) =>
      h(
        'li',
        h(SidebarChild, {
          item: child,
          depth: depth + 1,
        })
      )
    )
  )
}

export const SidebarChild: FunctionalComponent<{
  item: ResolvedSidebarItem
  depth?: number
}> = ({ item, depth = 0 }) => {
  const route = useRoute()
  const active = isActiveItem(route, item)

  if (item.isGroup) {
    return [
      h(
        'section',
        {
          class: 'sidebar-group',
        },
        [
          renderItem(item, {
            class: {
              'sidebar-heading': true,
              active,
            },
          }),
          renderChildren(item, depth),
        ]
      ),
    ]
  }

  return [
    renderItem(item, {
      class: {
        'sidebar-link': true,
        active,
      },
    }),
    renderChildren(item, depth),
  ]
}

SidebarChild.displayName = 'SidebarChild'

SidebarChild.props = {
  item: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
    default: 0,
  },
}
