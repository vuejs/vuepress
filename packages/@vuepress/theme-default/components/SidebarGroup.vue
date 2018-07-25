<template>
  <div
    class="sidebar-group"
    :class="{ first, collapsable }"
  >
    <p
      class="sidebar-heading"
      :class="{ open }"
      @click="handleClick"
    >
      <span>{{ item.title }}</span>
      <span
        class="arrow"
        v-if="collapsable"
        :class="open ? 'down' : 'right'">
      </span>
    </p>

    <DropdownTransition>
      <ul
        ref="items"
        class="sidebar-group-items"
        v-if="open || !collapsable"
      >
        <li v-for="child in item.children">
          <SidebarGroup v-if="child.type === 'group'"
            :item="child"
            :collapsable="child.collapsable"/>
          <SidebarLink v-else :item="child" :sidebarDepth="item.sidebarDepth"/>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script>
import Vue from 'vue'
import SidebarLink from './SidebarLink.vue'
import DropdownTransition from './DropdownTransition.vue'
import { isActive } from '../util'

const bus = new Vue()

export default {
  name: 'SidebarGroup',

  components: { SidebarLink, DropdownTransition },

  props: [
    'item',
    'first',
    'collapsable'
  ],

  data () {
    return {
      open: this.item.isolated && this.item.initialIsolatedOpen || false
    }
  },

  created () {
    this.initBusEvent()
    this.refreshOpen()
  },

  watch: {
    '$route' () {
      this.refreshOpen()
    }
  },

  methods: {
    initBusEvent () {
      const onRequestClose = this.onRequestClose.bind(this)
      bus.$on('requestClose', onRequestClose)
      this.$on('hook:destroyed', () => {
        bus.$off('requestClose', onRequestClose)
      })
    },
    refreshOpen () {
      const arr = this.item.descendants || []
      if (arr.some(c => isActive(this.$route, c.path))) {
        this.open = true
      }
    },
    handleClick () {
      this.open = !this.open
      if (this.open && !this.item.isolated) {
        bus.$emit('requestClose', { groupDepth: this.item.groupDepth, target: this })
      }
    },
    onRequestClose ({ groupDepth, target }) {
      if (
        target.$parent === this.$parent &&
        groupDepth === this.item.groupDepth &&
        !this.item.isolated &&
        target !== this
      ) {
        this.open = false
      }
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
    > .sidebar-heading
      cursor auto
      color inherit

.sidebar-heading
  color #999
  transition color .15s ease
  cursor pointer
  font-size 1.1em
  font-weight bold
  // text-transform uppercase
  padding 0 1.5rem
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
</style>
