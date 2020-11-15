<script lang="ts">
import { h } from 'vue'
import type { FunctionalComponent } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
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

const SidebarChild: FunctionalComponent<{
  item: ResolvedSidebarItem
  depth: number
}> = ({ item, depth }) => {
  const children = item.children?.length
    ? h(
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
    : []

  if (item.isGroup) {
    return [
      h(
        'section',
        {
          class: {
            'sidebar-group': true,
            'collapsable': item.collapsable,
          },
        },
        [
          h(
            item.link ? RouterLink : 'p',
            {
              class: {
                'sidebar-heading': true,
              },
              to: item.link,
            },
            item.text
          ),
          children,
        ]
      ),
    ]
  }

  const route = useRoute()
  const active =
    isActive(route, item.link) ||
    item.children?.some((child) => isActive(route, child.link))

  return [
    h(item.link ? NavLink : 'p', {
      class: {
        'sidebar-link': true,
        active,
      },
      item,
    }),
    children,
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

.sidebar-group
  .sidebar-group
    padding-left 0.5em
  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      cursor auto
      color inherit
  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0
    & > .sidebar-heading
      font-size 0.95em
      line-height 1.4
      font-weight normal
      padding-left 2rem
      &:not(.clickable)
        opacity 0.5
    & > .sidebar-group-items
      padding-left 1rem
      & > li > .sidebar-link
        font-size: 0.95em;
        border-left none
  &.depth-2
    & > .sidebar-heading
      border-left none

.sidebar-heading
  color $textColor
  transition color .15s ease
  cursor pointer
  font-size 1.1em
  font-weight bold
  // text-transform uppercase
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
  &.clickable
    &.active
      font-weight 600
      color $accentColor
      border-left-color $accentColor
    &:hover
      color $accentColor

.sidebar-group-items
  transition height .1s ease-out
  font-size 0.95em
  overflow hidden


.sidebar .sidebar-sub-headers
  padding-left 1rem
  font-size 0.95em

a.sidebar-link
  font-size 1em
  font-weight 400
  display inline-block
  color $textColor
  border-left 0.25rem solid transparent
  padding 0.35rem 1rem 0.35rem 1.25rem
  line-height 1.4
  width: 100%
  box-sizing: border-box
  &:hover
    color $accentColor
  &.active
    font-weight 600
    color $accentColor
    border-left-color $accentColor
  .sidebar-group &
    padding-left 2rem
  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none
    &.active
      font-weight 500
</style>
