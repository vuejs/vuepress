<template>
  <component :is="layout"/>
</template>

<script>
import { getLayoutAsyncComponent } from '../util'

export default {
  computed: {
    layout () {
      if (this.$page.path) {
        if (getLayoutAsyncComponent(this.$page.frontmatter.layout)) {
          return this.$page.frontmatter.layout
        }
        return 'Layout'
      }
      return 'NotFound'
    }
  }
}
</script>
