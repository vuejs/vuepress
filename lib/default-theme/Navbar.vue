<template>
  <div class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
  </div>
</template>

<script>
import SidebarButton from './SidebarButton.vue'

export default {
  components: { SidebarButton }
}
</script>
