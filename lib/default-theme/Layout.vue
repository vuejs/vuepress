<template>
  <div class="theme-container">
    <SideBar/>
    <Index v-if="$page.path === '/index'" />
    <Page v-else />
  </div>
</template>

<script>
import nprogress from 'nprogress'
import Index from './Index.vue'
import Page from './Page.vue'
import SideBar from './SideBar.vue'

export default {
  components: { Index, Page, SideBar },
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
