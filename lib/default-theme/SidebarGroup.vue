<template>
  <div class="sidebar-group" :class="{ first, collapsable }">
    <p class="sidebar-heading" :class="{ open }" @click="$emit('toggle')">
      <span>{{ item.title }}</span>
      <span class="arrow"
        v-if="collapsable"
        :class="open ? 'up' : 'down'"></span>
    </p>
    <transition name="sidebar-group"
      @enter="setHeight"
      @after-enter="unsetHeight"
      @before-leave="setHeight">
      <ul class="sidebar-group-items" ref="items" v-if="open || !collapsable">
        <li v-for="child in item.children">
          <SidebarLink :item="child"/>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink.vue'

export default {
  name: 'SidebarGroup',
  props: ['item', 'first', 'open', 'collapsable'],
  components: { SidebarLink },
  methods: {
    setHeight (items) {
      // explicitly set height so that it can be transitioned
      items.style.height = items.scrollHeight + 'px'
    },
    unsetHeight (items) {
      items.style.height = ''
    }
  }
}
</script>

<style lang="stylus">
.sidebar-group
  &:not(.first)
    margin-top 1em
  .sidebar-group
    padding-left 0.5em
  &:not(.collapsable)
    .sidebar-heading
      cursor auto
      color inherit

.sidebar-heading
  color #999
  transition color .15s ease
  cursor pointer
  font-size 1.1em
  font-weight bold
  // text-transform uppercase
  padding-left 1.5rem
  margin-top 0
  margin-bottom 0.5rem
  &.open, &:hover
    color inherit
  .arrow
    position relative
    top -0.12em
    left 0.5em
  &:.open .arrow
    top -0.18em

.sidebar-group-items
  transition height .1s ease-out
  overflow hidden

.sidebar-group-enter, .sidebar-group-leave-to
  height 0 !important
</style>
