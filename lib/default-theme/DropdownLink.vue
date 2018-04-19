<template>
  <div class="dropdown-wrapper" :class="{ open }">
    <a class="dropdown-title" @click="toggle">
      <span class="title">{{ item.text }}</span>
      <span class="arrow"></span>
    </a>
    <DropdownTransition>
      <ul class="nav-dropdown" v-show="open">
        <li
        class="dropdown-item"
        v-for="subItem in item.items"
        :key="subItem.link">
          <h4 v-if="subItem.type === 'links'">{{ subItem.text }}</h4>
          <ul class="dropdown-subitem-wrapper" v-if="subItem.type === 'links'">
            <li
            class="dropdown-subitem"
            v-for="childSubItem in subItem.items"
            :key="childSubItem.link">
              <NavLink :item="childSubItem"/>
            </li>
          </ul>
          <NavLink v-else :item="subItem"/>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script>
import { isExternal, ensureExt } from './util'
import NavLink from './NavLink.vue'
import DropdownTransition from './DropdownTransition.vue'

export default {
  components: { NavLink, DropdownTransition },
  data() {
    return {
      open: false
    }
  },
  props: {
    item: {
      required: true
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.dropdown-wrapper
  .dropdown-title
    display block
    .arrow
      display inline-block
      vertical-align middle
      margin-top -1px
      margin-left 0.4rem
      width 0
      height 0
      border-left 4px solid transparent
      border-right 4px solid transparent
      border-top 5px solid #ccc
  .nav-dropdown
    .dropdown-item
      color inherit
      line-height 1.7rem
      h4
        margin 0.45rem 0 0
        border-top 1px solid #eee
        padding 0.45rem 1.5rem 0 1.25rem
      .dropdown-subitem-wrapper
        padding 0
        list-style none
        .dropdown-subitem
          font-size 0.9em
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
            border-top 3px solid transparent
            border-bottom 3px solid transparent
            position absolute
            top calc(50% - 2px)
            left 9px
      &:first-child h4
        margin-top 0
        padding-top 0
        border-top 0

@media (max-width: $MQMobile)
  .dropdown-wrapper
    &.open .dropdown-title
      margin-bottom 0.5rem
    &:not(.open)
      .dropdown-title .arrow
        border-top 4px solid transparent
        border-bottom 4px solid transparent
        border-left 5px solid #ccc
    .nav-dropdown
      // only has transition at desktop.
      transition height .1s ease-out
      overflow hidden
      .dropdown-item
        h4
          border-top 0
          margin-top 0
          padding-top 0
        h4, & > a
          font-size 15px
          height 2rem
          line-height 2rem
        .dropdown-subitem
          font-size 14px
          padding-left 1rem

@media (min-width: $MQMobile)
  .dropdown-wrapper
    &:hover .nav-dropdown
      // override the inline style.
      display block!important
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
