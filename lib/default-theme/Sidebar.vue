<template>
  <div class="sidebar">
    <NavLinks/>
    <ul>
      <li v-for="(item, i) in sidebarItems">
        <SidebarLink v-if="item.type === 'page'" :item="item"/>
        <SidebarGroup v-else-if="item.type === 'group'"
          :item="item"
          :first="i === 0"
          :open="i === openGroupIndex"
          :collapsable="item.collapsable"
          @toggle="toggleGroup(i)" />
      </li>
    </ul>
  </div>
</template>

<script>
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import NavLinks from './NavLinks.vue'
import { resolvePage, isActive } from './util'

export default {
  components: { SidebarGroup, SidebarLink, NavLinks },
  data () {
    return {
      openGroupIndex: 0
    }
  },
  created () {
    this.refreshIndex()
  },
  watch: {
    '$route' () {
      this.refreshIndex()
    }
  },
  computed: {
    sidebarItems () {
      return resolveSidebarItems(
        this.$route,
        this.$site
      )
    }
  },
  methods: {
    refreshIndex () {
      const index = resolveOpenGroupIndex(
        this.$route,
        this.sidebarItems
      )
      if (index > -1) {
        this.openGroupIndex = index
      }
    },
    toggleGroup (index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },
    isActive (page) {
      return isActive(this.$route, page.path)
    }
  }
}

function resolveOpenGroupIndex (route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => isActive(route, c.path))) {
      return i
    }
  }
  return -1
}

function resolveSidebarItems (route, site) {
  const { pages, themeConfig } = site
  const sidebarConfig = themeConfig.sidebar
  if (!sidebarConfig) {
    return pages.map(p => Object.assign({ page: 'type' }, p))
  } else {
    const { base, config } = resolveMatchingSidebarConfig(route, sidebarConfig)
    return config
      ? config.map(item => resolveItem(item, pages, base))
      : []
  }
}

function resolveMatchingSidebarConfig (route, sidebarConfig) {
  if (Array.isArray(sidebarConfig)) {
    return {
      base: '/',
      config: sidebarConfig
    }
  }
  for (const base in sidebarConfig) {
    if (ensureEndingSlash(route.path).indexOf(base) === 0) {
      return {
        base,
        config: sidebarConfig[base]
      }
    }
  }
  return {}
}

function ensureEndingSlash (path) {
  return /(\.html|\/)$/.test(path)
    ? path
    : path + '/'
}

function resolveItem (item, pages, base, isNested) {
  if (typeof item === 'string') {
    return resolvePage(pages, item, base)
  } else if (Array.isArray(item)) {
    return Object.assign(resolvePage(pages, item[0], base), {
      title: item[1]
    })
  } else {
    if (isNested) {
      console.error(
        '[vuepress] Nested sidebar groups are not supported. ' +
        'Consider using navbar + categories instead.'
      )
    }
    const children = item.children || []
    return {
      type: 'group',
      title: item.title,
      children: children.map(child => resolveItem(child, pages, base, true)),
      collapsable: item.collapsable !== false
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    margin-bottom 1rem
    a
      display block
      font-weight 600
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
</style>
