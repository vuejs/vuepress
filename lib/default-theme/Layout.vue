<template>
  <div class="theme-container"
    :class="{
      'sidebar-open': isSidebarOpen,
      'no-sidebar': $page.frontmatter.home || $page.frontmatter.sidebar === false
    }"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">
    <Navbar @toggle-sidebar="toggleSidebar"/>
    <Sidebar @toggle-sidebar="toggleSidebar"/>
    <div class="custom-layout" v-if="$page.frontmatter.layout">
      <component :is="$page.frontmatter.layout"/>
    </div>
    <Home v-else-if="$page.frontmatter.home"/>
    <Page v-else/>
  </div>
</template>

<script>
import Vue from 'vue'
import nprogress from 'nprogress'
import Home from './Home.vue'
import Navbar from './Navbar.vue'
import Page from './Page.vue'
import Sidebar from './Sidebar.vue'
import { pathToComponentName, getTitle, getLang } from '../app/util'

export default {
  components: { Home, Page, Sidebar, Navbar },
  data () {
    return {
      isSidebarOpen: false
    }
  },

  created () {
    if (this.$ssrContext) {
      this.$ssrContext.title = getTitle(this.$page)
      this.$ssrContext.lang = getLang(this.$page)
    }
  },

  mounted () {
    // update title / meta tags
    this.currentMetaTags = []
    const updateMeta = () => {
      document.title = getTitle(this.$page)
      document.documentElement.lang = getLang(this.$page)
      this.currentMetaTags = updateMetaTags(this.$page, this.currentMetaTags)
    }
    this.$watch('$page', updateMeta)
    updateMeta()

    // configure progress bar
    nprogress.configure({ showSpinner: false })

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(pathToComponentName(to.path))) {
        nprogress.start()
      }
      next()
    })

    this.$router.afterEach(() => {
      nprogress.done()
      this.isSidebarOpen = false
    })
  },

  beforeDestroy () {
    updateMetaTags(null, this.currentMetaTags)
  },

  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },
    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  }
}

function updateMetaTags (page, current) {
  if (current) {
    current.forEach(c => {
      document.head.removeChild(c)
    })
  }
  const data = page && page.frontmatter.meta
  if (data) {
    return data.map(m => {
      const tag = document.createElement('meta')
      Object.keys(m).forEach(key => {
        tag.setAttribute(key, m[key])
      })
      document.head.appendChild(tag)
      return tag
    })
  }
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="./styles/theme.stylus" lang="stylus"></style>
