<template>
  <nav class="nav-links" v-if="userLinks.length || githubLink">
    <!-- user links -->
    <div
      class="nav-item"
      v-for="item in userLinks"
      :key="item.link">
      <div
        v-if="item.type === 'dropdown'"
        class="dropdown-wrapper">
        <span class="dropdown-title">{{ item.text }}</span>
        <span class="arrow"></span>
        <ul class="nav-dropdown">
          <li
            v-for="subItem in item.items"
            :key="subItem.link">
            <nav-link :item="subItem"></nav-link>
          </li>
        </ul>
      </div>
      <nav-link v-else :item="item"></nav-link>
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
import NavLink from './NavLink.vue'
import { isActive, ensureExt } from './util'

export default {
  components: { OutboundLink, NavLink },
  computed: {
    userLinks () {
      return (this.$site.themeConfig.nav || []).map(({ text, link, type, items }) => ({
        text,
        type,
        link: link ? ensureExt(link) : void 0,
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
  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    font-weight 500
    line-height 2rem
    .dropdown-wrapper
      cursor pointer
      padding-right 15
      &:hover .nav-dropdown
          display block
      .arrow
        display inline-block
        vertical-align middle
        margin-top -1px
        margin-left 6px
        width 0
        height 0
        border-left 4px solid transparent
        border-right 4px solid transparent
        border-top 5px solid #ccc
      .nav-dropdown
        li
          color inherit
          line-height 1.7rem
          padding: 0 1.5rem 0 1.25rem
          a
            position relative
            border-bottom: none
            font-weight 400
            &.router-link-active
              color: $accentColor
              &:after
                content: ""
                width: 0
                height: 0
                border-left 5px solid $accentColor
                border-top 4px solid transparent
                border-bottom 4px solid transparent
                position absolute
                top calc(50% - 3px)
                left -10px
            &:hover
              margin-bottom 0
              color $accentColor
  .github-link
    margin-left 1.5rem

@media (max-width: $MQMobile)
  .nav-links
    .nav-item, .github-link
      margin-left 0

@media (min-width: $MQMobile)
  .nav-links
    a
      &:hover, &.router-link-active
        color $textColor
        margin-bottom -2px
        border-bottom 2px solid lighten($accentColor, 5%)
    .nav-dropdown
      display none
      box-sizing border-box;
      max-height calc(100vh - 2.7rem)
      overflow-y auto
      position absolute
      top 100%
      right 0
      background-color #fff
      padding 10px 0
      border 1px solid #ddd
      border-bottom-color #ccc
      text-align left
      border-radius 0.25rem
      white-space nowrap
      margin 0
</style>
