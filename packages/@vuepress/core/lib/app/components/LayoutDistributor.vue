<template>
  <component :is="layout"/>
</template>

<script>
import Vue from 'vue'
import { getLayoutAsyncComponent } from '../util'

Vue.component('Layout', getLayoutAsyncComponent('Layout'))
Vue.component('NotFound', getLayoutAsyncComponent('NotFound'))

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
