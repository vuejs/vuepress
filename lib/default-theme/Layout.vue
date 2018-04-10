<template>
  <div class="theme-container">
    <!-- <Navbar/> -->
    <Sidebar/>
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
    })
  }
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="./styles/theme.stylus" lang="stylus"></style>
