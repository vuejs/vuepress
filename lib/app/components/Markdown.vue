<template>
    <div>
        <component v-if="this.componentName" :is="this.componentName"></component>
    </div>
</template>

<script>
import { routes } from '../.temp/routes'
import Vue from 'vue'

export default {
  props: {
    src: {
      type: String
    }
  },
  data () {
    return {
      componentName: '',
      paths: []
    }
  },
  async mounted () {
    const page = routes.find(route => {
      if (route.component != null) {
        return route.path.replace('.html', '') === this.src
      }
    }) || {}
    if (Vue.component(page.name) != null) {
      this.componentName = page.name
    } else {
      page.beforeEnter(0, 0, () => {
        this.componentName = page.name
      })
    }
  }
}
</script>
