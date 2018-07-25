<template>
  <div class="sidebar">
    <NavLinks/>
    <slot name="top"/>
    <ul class="sidebar-links" v-if="items.length">
      <li v-for="(item, i) in items" :key="i">
        <SidebarGroup
          v-if="item.type === 'group'"
          :item="item"
          :first="i === 0"
          :collapsable="item.collapsable || item.collapsible"/>
        <SidebarLink v-else :item="item"/>
      </li>
    </ul>
    <slot name="bottom"/>
  </div>
</template>

<script>
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import NavLinks from './NavLinks.vue'

export default {
  components: { SidebarGroup, SidebarLink, NavLinks },

  props: ['items']
}
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  .sidebar-links
    padding 1.5rem 0

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    .sidebar-links
      padding 1rem 0
</style>
