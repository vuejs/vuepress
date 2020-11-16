<template>
  <aside class="sidebar">
    <NavbarLinks />

    <slot name="top" />

    <ul class="sidebar-links">
      <template v-for="item in sidebarItems" :key="item.link">
        <SidebarChild :item="item" />
      </template>
    </ul>

    <slot name="bottom" />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSidebarItems } from '../composables'
import NavbarLinks from './NavbarLinks.vue'
import SidebarChild from './SidebarChild.vue'

export default defineComponent({
  name: 'Sidebar',

  components: {
    NavbarLinks,
    SidebarChild,
  },

  setup() {
    const sidebarItems = useSidebarItems()
    return {
      sidebarItems,
    }
  },
})
</script>

<style lang="stylus">
@require '../styles/config.styl'

.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .navbar-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .navbar-links-item
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top .75rem

@media (max-width: $MQMobile)
  .sidebar
    .navbar-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
</style>
