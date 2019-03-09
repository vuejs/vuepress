<template>
  <component :is="layout"/>
</template>

<script>
import Vue from 'vue'

export default {
  computed: {
    layout () {
      if (this.$page.path) {
        if (
          this.$vuepress.isLayoutExists(this.$page.frontmatter.layout)
          || Boolean(Vue.component(this.$page.frontmatter.layout))
        ) {
          return this.$page.frontmatter.layout
        }
        return 'Layout'
      }
      return 'NotFound'
    }
  }
}
</script>
