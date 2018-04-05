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
<style src="./nprogress.css"></style>
<style>
.theme-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

pre[class*="language-"] {
  line-height: 1.4;
  border-radius: 5px;
}

pre[class*="language-"] code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
</style>
