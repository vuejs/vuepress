<template>
  <component :is="layout" :slot-key="slotKey || 'default'"/>
</template>

<script>
import Vue from 'vue'
import components from '@internal/page-components'
import ContentLoading from './ContentLoading'

export default {
  components: { ContentLoading },

  props: {
    pageKey: String,
    slotKey: String
  },

  data () {
    return {
      layout: 'ContentLoading'
    }
  },

  computed: {
    $key () {
      return this.pageKey || this.$page.key
    }
  },

  created () {
    this.loadContent(this.$key)
  },

  watch: {
    $key (key) {
      this.loadContent(key)
    }
  },

  methods: {
    loadContent (pageKey) {
      if (Vue.component(pageKey)) {
        return
      }
      this.layout = 'ContentLoading'
      if (components[pageKey]) {
        if (!this.$ssrContext) {
          Promise.all([
            components[pageKey](),
            new Promise(resolve => setTimeout(resolve, 0))
          ]).then(([comp]) => {
            this.$vuepress.$emit('AsyncMarkdownAssetLoaded', this.pageKey)
            Vue.component(pageKey, comp.default)
            this.layout = pageKey
          })
        }
      }
    }
  }
}
</script>
