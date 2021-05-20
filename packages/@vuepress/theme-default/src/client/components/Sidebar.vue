<template>
  <aside class="sidebar">
    <NavbarLinks />

    <slot name="top" />

    <ul class="sidebar-links">
      <SidebarChild
        v-for="item in sidebarItems"
        :key="item.link || item.text"
        :item="item"
      />
    </ul>

    <slot name="bottom" />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSidebarItems } from '../composables'
import NavbarLinks from './NavbarLinks.vue'
import { SidebarChild } from './SidebarChild'

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
