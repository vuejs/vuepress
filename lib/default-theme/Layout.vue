<template>
  <div class="theme-container">
    <ul class="nav">
      <li v-for="page in $site.pages">
        <router-link :to="page.path">{{ page.path }}</router-link>
      </li>
    </ul>
    <Index v-if="$page.path === '/index'" />
    <Page v-else />
  </div>
</template>

<script>
import nprogress from 'nprogress'
import Index from './Index.vue'
import Page from './Page.vue'

export default {
  components: { Index, Page },
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
<style src="./styles.css"></style>
