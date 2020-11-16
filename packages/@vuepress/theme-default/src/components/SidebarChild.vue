<script lang="ts">
import { h } from 'vue'
import type { FunctionalComponent, VNode } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ResolvedSidebarItem } from '../composables'
import NavLink from './NavLink.vue'

const normalizePath = (path: string): string =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(md|html)$/, '')

const isActive = (
  route: RouteLocationNormalizedLoaded,
  target?: string
): boolean => {
  if (target === undefined) {
    return false
  }

  if (route.hash === target) {
    return true
  }

  const currentPath = normalizePath(route.path)
  const targetPath = normalizePath(target)

  return currentPath === targetPath
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

const SidebarChild: FunctionalComponent<{
  item: ResolvedSidebarItem
  depth: number
}> = ({ item, depth }) => {
  if (item.isGroup) {
    return [
      h(
        'section',
        {
          class: {
            'sidebar-group': true,
          },
        },
        [
          renderItem(item, {
            class: 'sidebar-heading',
          }),
          renderChildren(item, depth),
        ]
      ),
    ]
  }

  const route = useRoute()
  const active =
    isActive(route, item.link) ||
    item.children?.some((child) => isActive(route, child.link))

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

export default SidebarChild
</script>

<style lang="stylus">
@require '../styles/config.styl'

.sidebar-group .sidebar-group
  & > .sidebar-heading
    opacity 0.5
    font-size 0.95em
    line-height 1.4
    font-weight normal
    padding-left 2rem

.sidebar-heading
  color $textColor
  transition color .15s ease
  cursor default
  font-size 1.1em
  font-weight bold
  padding 0.35rem 1.5rem 0.35rem 1.25rem
  width 100%
  box-sizing border-box
  margin 0
  border-left 0.25rem solid transparent
  &.open, &:hover
    color inherit
  .arrow
    position relative
    top -0.12em
    left 0.5em

.sidebar .sidebar-sub-headers
  padding-left 1rem
  font-size 0.95em

.sidebar-link
  font-size 1em
  font-weight 400
  display inline-block
  color $textColor
  border-left 0.25rem solid transparent
  margin 0
  padding 0.35rem 1rem 0.35rem 1.25rem
  line-height 1.4
  width: 100%
  box-sizing: border-box
  .sidebar-group &
    padding-left 2rem
  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none
    &.active
      font-weight 500

a.sidebar-heading,
a.sidebar-link
  cursor pointer
  &.active
    font-weight 600
    color $accentColor
    border-left-color $accentColor
  &:hover
    color $accentColor
</style>
