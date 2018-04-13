<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
    <router-link to="/">
      <img class="logo"
        v-if="$site.themeConfig.logo"
        :src="$withBase($site.themeConfig.logo)">
      <span class="site-name"
        v-if="$site.title"
        :class="{ 'can-hide': $site.themeConfig.logo }">
        {{ $site.title }}
      </span>
    </router-link>
    <div class="links">
      <SearchBox v-if="$site.themeConfig.search !== false"/>
      <NavLinks class="can-hide"/>
    </div>
  </header>
</template>

<script>
import SidebarButton from './SidebarButton.vue'
import SearchBox from './SearchBox.vue'
import NavLinks from './NavLinks.vue'

export default {
  components: { SidebarButton, NavLinks, SearchBox }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.navbar
  padding 0.7rem 1.5rem
  line-height 2rem
  position relative
  a, span, img
    vertical-align middle
    display inline-block
  .logo
    display inline-block
    height 2rem
    min-width 2rem
    margin-right 0.8rem
  .site-name
    font-size 1.3rem
    line-height 2rem
    font-weight 600
    color $textColor
    position relative
  .links
    font-size 0.9rem
    position absolute
    right 1.5rem
    top 0.7rem

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
</style>
