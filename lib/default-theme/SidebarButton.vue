<template>
  <div class="sidebar-button" @click="$emit('toggle-sidebar')">
    <a class="icon"></a>
  </div>
</template>

<style lang="stylus">
@import './styles/config.stylus'

.sidebar-button
  display none
  width 24px
  height 24px
  position absolute
  padding 0.5rem
  top 0.5rem
  left 1rem
  .icon
    display block
    width 24px
    height 24px
    background url('./assets/menu.png')
    background-size 24px

@media (max-width: $MQMobile)
  .sidebar-button
    display block
</style>
