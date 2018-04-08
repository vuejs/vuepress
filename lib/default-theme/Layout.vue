<template>
  <div class="theme-container">
    <div class="sidebar">
      <ul>
        <li v-for="item in sidebarItems">
          <router-link v-if="item.type === 'page'" :to="item.path">
            {{ item.title || item.path }}
          </router-link>
          <div class="sidebar-group" v-else-if="item.type === 'heading'">
            <p class="sidebar-heading">{{ item.title }}</p>
            <ul>
              <li v-for="child in item.children">
                <router-link v-if="child.type === 'page'" :to="child.path">
                  {{ child.title || child.path }}
                </router-link>
              </li>
            </ul>
          </div>
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
import resolveSidebar from './resolveSidebar'

export default {
  components: { Index, Page },
  computed: {
    sidebarItems () {
      return resolveSidebar(
        this.$route,
        this.$site
      )
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
