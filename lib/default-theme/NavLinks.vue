<template>
  <nav class="nav-links" v-if="userLinks.length || githubLink">
    <!-- user links -->
    <div class="nav-item" v-for="item in userLinks" :key="item.link">
      <div
          v-if="item.type === 'dropdown'"
          class="nav-dropdown-wrapper">
        <span>{{ item.text }}</span>
        <ul class="nav-dropdown">
          <li v-for="subItem in item.items">
            <router-link
                :to="subItem.link">
              {{ subItem.text }}
            </router-link>
          </li>
        </ul>
      </div>
      <router-link
          v-else
          :to="item.link">
        {{ item.text }}
      </router-link>
    </div>
    <!-- github link -->
    <a v-if="githubLink"
      :href="githubLink"
      class="github-link"
      target="_blank"
      rel="noopener">
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
      return (this.$site.themeConfig.nav || []).map(({ text, link, type, items }) => ({
        text,
        type,
        link: ensureExt(link),
        items: (items || []).map(({ text, link }) => ({ text, link: ensureExt(link) }))
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
    line-height 1.25rem
    color inherit
    &:hover, &.router-link-active
      color $accentColor
  .github-link
    margin-left 1.5rem
  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    font-weight 500
    line-height 2rem
    .nav-dropdown-wrapper
      cursor pointer
      padding-right 15px
      &:after
        content: ''
        position absolute
        right: 0px
        top: calc(50% - 2px)
        display block
        border-left: 4px solid transparent
        border-right: 4px solid transparent
        border-top: 5px solid #ccc
      &:hover
        .nav-dropdown
          display: block
      .nav-dropdown
        display: none
        box-sizing: border-box;
        max-height: calc(100vh - 2.7rem)
        overflow-y: auto
        position: absolute
        top: 100%
        right: 0
        background-color: #fff
        padding: 10px 0
        border: 1px solid #ddd
        border-bottom-color: #ccc
        text-align: left
        border-radius: 0.25rem
        white-space: nowrap
        margin 0
        & > li
          line-height 1.7rem
          padding: 0 1.5rem 0 1.25rem;

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
