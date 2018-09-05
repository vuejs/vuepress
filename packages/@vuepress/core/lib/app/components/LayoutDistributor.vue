<template>
  <component :is="layout"/>
</template>

<script>
export default {
  computed: {
    layout () {
      if (this.$page.path) {
        return this.$page.frontmatter.layout || 'Layout'
      }
      return 'NotFound'
    }
  }
}
</script>
