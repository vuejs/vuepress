<template>
  <nav class="nav-links" v-if="userLinks.length || githubLink">
    <!-- user links -->
    <router-link v-for="item in userLinks"
      :to="item.link"
      :key="item.link">
      {{ item.text }}
    </router-link>
    <!-- github link -->
    <a v-if="githubLink"
      :href="githubLink"
      class="github-link"
      target="_blank">
      Github
      <OutboundLink/>
    </a>
  </nav>
</template>

<script>
import OutboundLink from './OutboundLink.vue'
import { isActive, ensureExt } from './util'

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
  },
  methods: {
    isActive
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.nav-links
  display inline-block
  a
    color inherit
    font-weight 500
    line-height 1.25rem
    margin-left 1.5rem
    &:hover, &.router-link-active
      color $accentColor

@media (max-width: $MQMobile)
  .nav-links a
    margin-left 0

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color $textColor
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 5%)
</style>
