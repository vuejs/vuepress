<template>
  <div class="theme-container"
    :class="{ 'sidebar-open': isSidebarOpen }"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">
    <Navbar @toggle-sidebar="toggleSidebar"/>
    <Sidebar @toggle-sidebar="toggleSidebar"/>
    <Page/>
  </div>
</template>

<script>
import Vue from 'vue'
import nprogress from 'nprogress'
import Navbar from './Navbar.vue'
import Page from './Page.vue'
import Sidebar from './Sidebar.vue'
import { pathToComponentName } from '../app/util'

export default {
  components: { Page, Sidebar, Navbar },
  data () {
    return {
      isSidebarOpen: false
    }
  },
  mounted () {
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
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="./styles/theme.stylus" lang="stylus"></style>
