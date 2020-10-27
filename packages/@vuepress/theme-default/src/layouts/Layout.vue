<template>
  <div class="theme-container">
    <Home v-if="$frontmatter.home" />

    <div v-else class="theme-default-content">
      <Content />
    </div>
  </div>

  <Debug />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from '../components/Home.vue'

export default defineComponent({
  name: 'Layout',

  components: {
    Home,
  },
})
</script>
