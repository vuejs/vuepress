<template>
  <div class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
    <router-link to="/">
      <img class="logo"
        v-if="$site.themeConfig.logo"
        :src="$site.base + $site.themeConfig.logo">
      <span class="site-name" v-if="$site.title">{{ $site.title }}</span>
    </router-link>
    <!-- search box -->
    <!-- user links -->
    <!-- github link -->
  </div>
</template>

<script>
import SidebarButton from './SidebarButton.vue'

export default {
  components: { SidebarButton }
}
</script>

<style lang="stylus">
@import './styles/config.stylus'

.navbar
  padding 0.8rem 1.5rem
  span, a, img
    vertical-align middle
    display inline-block

.logo
  display inline-block
  height 1.8rem
  min-width 1.8rem
  margin-right 0.8rem

.site-name
  font-size 1.2rem
  font-weight 600
  color $textColor
</style>
