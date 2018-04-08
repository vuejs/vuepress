<template>
  <div class="theme-container">
    <div class="sidebar">
      <ul>
        <li v-for="page in sortedPages">
          <router-link :to="page.path">
            {{ page.frontmatter.navTitle || page.title || page.path }}
          </router-link>
        </li>
      </ul>
    </div>
    <Index v-if="$page.path === '/index'" />
    <Page v-else />
  </div>
</template>

<script>
import nprogress from 'nprogress'
import Index from './Index.vue'
import Page from './Page.vue'

function normalize (path) {
  return path.replace(/\.(md|html)$/, '')
}

function findIndex (order, page) {
  const pagePath = normalize(page.path)
  for (let i = 0; i < order.length; i++) {
    if (normalize(order[i]) === pagePath) {
      return i
    }
  }
  return Infinity
}

export default {
  components: { Index, Page },
  computed: {
    sortedPages () {
      const pages = this.$site.pages
      const order = this.$site.themeConfig.sidebar
      if (!order) {
        return pages
      } else {
        return pages.slice().sort((a, b) => {
          const aIndex = findIndex(order, a)
          const bIndex = findIndex(order, b)
          return aIndex - bIndex
        })
      }
    }
  },
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

<style src="./nprogress.css"></style>
<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="./theme.stylus" lang="stylus"></style>
