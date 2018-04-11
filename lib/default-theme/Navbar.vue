<template>
  <div class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
    <router-link to="/">
      <img class="logo"
        v-if="$site.themeConfig.logo"
        :src="$site.themeConfig.logo">
      <span class="site-name"
        v-if="$site.title"
        :class="{ 'can-hide': $site.themeConfig.logo }">
        {{ $site.title }}
      </span>
    </router-link>
    <div class="links">
      <!-- search box -->
      <NavLinks class="can-hide"/>
    </div>
  </div>
</template>

<script>
import SidebarButton from './SidebarButton.vue'
import NavLinks from './NavLinks.vue'

export default {
  components: { SidebarButton, NavLinks }
}
</script>

<style lang="stylus">
@import './styles/config.stylus'

.navbar
  padding 0.7rem 1.5rem
  line-height 2rem
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
    font-weight 600
    color $textColor
    position relative
    top -0.125rem
  .links
    float right
    a:not(:last-child)
      margin-right 1.5rem

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
</style>
