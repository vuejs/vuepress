<template>
  <nav class="nav-links" v-if="userLinks.length || githubLink">
    <!-- user links -->
    <template v-for="item in userLinks">
      <a v-if="item.isOutbound"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer">
        {{ item.text }}
      </a>
      <router-link
        v-else
        :to="item.link"
        :key="item.link"
        :exact="item.link === '/'">
        {{ item.text }}
      </router-link>
    </template>
    <!-- github link -->
    <a v-if="githubLink"
      :href="githubLink"
      class="github-link"
      target="_blank"
      rel="noopener">
      GitHub
      <OutboundLink/>
    </a>
  </nav>
</template>

<script>
import OutboundLink from './OutboundLink.vue'
import { isActive, ensureExt, outboundRE } from './util'

export default {
  components: { OutboundLink },
  computed: {
    userLinks () {
      return (this.$site.themeConfig.nav || []).map(item => ({
        text: item.text,
        link: ensureExt(item.link),
        isOutbound: outboundRE.test(item.link)
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
