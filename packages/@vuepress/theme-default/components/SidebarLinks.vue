<template>
  <ul
    v-if="items.length"
    class="sidebar-links"
  >
    <li
      v-for="(item, i) in items"
      :key="i"
    >
      <SidebarGroup
        v-if="item.type === 'group'"
        :item="item"
        :open="i === openGroupIndex"
        :collapsable="item.collapsable || item.collapsible"
        :depth="depth"
        @toggle="toggleGroup(i)"
      />
      <SidebarLink
        v-else
        :sidebar-depth="sidebarDepth"
        :item="item"
      />
    </li>
  </ul>
</template>

<script>
import SidebarGroup from '@theme/components/SidebarGroup.vue'
import SidebarLink from '@theme/components/SidebarLink.vue'
import { isActive } from '../util'

export default {
  name: 'SidebarLinks',

  components: { SidebarGroup, SidebarLink },

  props: [
    'items',
    'depth',  // depth of current sidebar links
    'sidebarDepth' // depth of headers to be extracted
  ],

  data () {
    return {
      openGroupIndex: 0
    }
  },

  watch: {
    '$route' () {
      this.refreshIndex()
    }
  },

  created () {
    this.refreshIndex()
  },
  
  mounted() {
    this.isInViewPortOfOne()
  },
  
  updated: function () {
    this.isInViewPortOfOne()
  },

  methods: {
    isInViewPortOfOne () {
        let el = document.getElementsByClassName("active sidebar-link")[1]
        if (el ==null || el.offsetTop == undefined) {
          el = document.getElementsByClassName("active sidebar-link")[0]
        }
        if (el ==null || el.offsetTop == undefined) return
        
        const viewPortHeight = document.getElementsByClassName("sidebar")[0].clientHeight || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
        const offsetTop = el.offsetTop
        const scrollTop = document.getElementsByClassName("sidebar")[0].scrollTop

        let isView = (offsetTop +15 <= viewPortHeight + scrollTop)
        if (!isView) {
          document.getElementsByClassName("sidebar")[0].scrollTop = (offsetTop + 36 - viewPortHeight)
        }
    },
    
    refreshIndex () {
      const index = resolveOpenGroupIndex(
        this.$route,
        this.items
      )
      if (index > -1) {
        this.openGroupIndex = index
      }
    },

    toggleGroup (index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },

    isActive (page) {
      return isActive(this.$route, page.regularPath)
    }
  }
}

function resolveOpenGroupIndex (route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (descendantIsActive(route, item)) {
      return i
    }
  }
  return -1
}

function descendantIsActive (route, item) {
  if (item.type === 'group') {
    return item.children.some(child => {
      if (child.type === 'group') {
        return descendantIsActive(route, child)
      } else {
        return child.type === 'page' && isActive(route, child.path)
      }
    })
  }
  return false
}
</script>
