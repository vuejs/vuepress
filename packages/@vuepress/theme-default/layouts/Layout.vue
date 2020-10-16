<template>
  <div class="theme-container">
    <Home v-if="frontmatter.home" />

    <Content v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageData } from '@vuepress/client'
import Home from '../components/Home.vue'

export default defineComponent({
  name: 'Layout',

  components: {
    Home,
  },

  setup() {
    const { frontmatter } = usePageData()
    return {
      frontmatter,
    }
  },
})
</script>
