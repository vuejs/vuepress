<template>
  <nav class="nav-links" v-if="userLinks.length || githubLink">
    <!-- user links -->
    <div
      class="nav-item"
      v-for="item in userLinks"
      :key="item.link">
      <div
        v-if="item.type === 'links'"
        class="dropdown-wrapper">
        <span class="dropdown-title">{{ item.text }}</span>
        <span class="arrow"></span>
        <ul class="nav-dropdown">
          <li
            v-for="subItem in item.items"
            :key="subItem.link">
            <h4 v-if="subItem.type === 'links'">{{ subItem.text }}</h4>
            <ul v-if="subItem.type === 'links'">
              <li
                v-for="childSubItem in subItem.items"
                :key="childSubItem.link">
                <nav-link :item="childSubItem"></nav-link>
              </li>
            </ul>
            <nav-link v-else :item="subItem"></nav-link>
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
      GitHub
      <OutboundLink/>
    </a>
  </nav>
</template>

<script>
import OutboundLink from './OutboundLink.vue'
import { isActive, resolveNavLinkItem } from './util'
import NavLink from './NavLink.vue'

export default {
  components: { OutboundLink, NavLink },
  computed: {
    userLinks () {
      return (this.$site.themeConfig.nav || []).map((link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
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
          a
            display block
            height 1.7rem
            line-height 1.7rem
            position relative
            border-bottom none
            font-weight 400
            margin-bottom 0
            padding 0 1.5rem 0 1.25rem
            &:hover
              color $accentColor
            &.router-link-active
              color $accentColor
              &::after
                content ""
                width 0
                height 0
                border-left 5px solid $accentColor
                border-top 4px solid transparent
                border-bottom 4px solid transparent
                position absolute
                top calc(50% - 3px)
                left 10px
          &:first-child h4
            margin-top 0
            padding-top 0
            border-top 0
          & > h4
            margin 0.45rem 0 0
            border-top 1px solid #eee
            padding 0.45rem 1.5rem 0 1.25rem
          & > ul
            padding 0
            list-style none
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
