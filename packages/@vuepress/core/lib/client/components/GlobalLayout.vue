<template>
  <component :is="layout"/>
</template>

<script>
export default {
  computed: {
    layout () {
      if (this.$page.path) {
        if (this.$vuepress.isLayoutExists(this.$page.frontmatter.layout)) {
          return this.$page.frontmatter.layout
        }
        return 'Layout'
      }
      return 'NotFound'
    }
  }
}
</script>
