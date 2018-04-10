<template>
  <div class="nav-links">
    <!-- user links -->
    <router-link v-for="item in userLinks" :to="item.link">
      {{ item.text }}
    </router-link>
    <!-- github link -->
    <a v-if="githubLink"
      :href="githubLink"
      class="github-link"
      target="_blank">
      Github <OutboundLink/>
    </a>
  </div>
</template>

<script>
import OutboundLink from './icons/OutboundLink.vue'
import { ensureExt } from './util'

export default {
  components: { OutboundLink },
  computed: {
    userLinks () {
      return (this.$site.themeConfig.nav || []).map(item => ({
        text: item.text,
        link: ensureExt(item.link)
      }))
    },
    githubLink () {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
    }
  }
}
</script>

<style lang="stylus">
.github-link svg
  color #aaa
  display inline-block
  position relative
  top .1rem
</style>
