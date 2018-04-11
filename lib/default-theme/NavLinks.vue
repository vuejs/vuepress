<template>
  <div class="nav-links">
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
  </div>
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
@import './styles/config.stylus'

.nav-links a
  color inherit
  font-weight 500
  line-height 1.5
  &:hover, &.router-link-active
    color $accentColor

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color $textColor
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 5%)
</style>
