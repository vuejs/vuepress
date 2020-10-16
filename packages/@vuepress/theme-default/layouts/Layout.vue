<template>
  <div class="theme-container">
    <h1>Layout</h1>

    <Content />

    <Debug />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePageData } from '@vuepress/client'

export default defineComponent({
  name: 'Home',

  setup() {
    const { frontmatter } = usePageData()
    const data = frontmatter
    const actionLink = computed(() => ({
      link: data.value.actionLink,
      text: data.value.actionText,
    }))
    return {
      data,
      actionLink,
    }
  },
})
</script>
