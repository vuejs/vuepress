<template>
  <div class="sidebar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
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
import SidebarLink, { isActive } from './SidebarLink.vue'
import SidebarButton from './SidebarButton.vue'
import { resolvePage } from './util'

export default {
  components: { SidebarGroup, SidebarLink, SidebarButton },
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
      return isActive(this.$route, page)
    }
  }
}

function resolveOpenGroupIndex (route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => isActive(route, c))) {
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
    const matchingConfig = resolveMatchingSidebarConfig(route, sidebarConfig)
    return matchingConfig.map(item => resolveItem(item, pages))
  }
}

function resolveMatchingSidebarConfig (route, sidebarConfig) {
  if (Array.isArray(sidebarConfig)) {
    return sidebarConfig
  }
  for (const base in sidebarConfig) {
    if (ensureEndingSlash(route.path).indexOf(base) === 0) {
      return sidebarConfig[base]
    }
  }
}

function ensureEndingSlash (path) {
  return /(\.html|\/)$/.test(path)
    ? path
    : path + '/'
}

function resolveItem (item, pages, isNested) {
  if (typeof item === 'string') {
    return resolvePage(pages, item)
  } else if (Array.isArray(item)) {
    return Object.assign(resolvePage(pages, item[0]), {
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
      children: children.map(child => resolveItem(child, pages, true)),
      collapsable: item.collapsable !== false
    }
  }
}
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
</style>
