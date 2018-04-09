<template>
  <div class="theme-container">
    <Sidebar/>
    <Page/>
  </div>
</template>

<script>
import nprogress from 'nprogress'
import Page from './Page.vue'
import Sidebar from './Sidebar.vue'

export default {
  components: { Page, Sidebar },
  mounted () {
    nprogress.configure({ showSpinner: false })

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path) {
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
