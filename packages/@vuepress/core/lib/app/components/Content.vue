<template>
  <transition :name="layout === 'ContentLoading' || !layout ? null : 'fade'">
    <component
      v-if="layout"
      :is="layout"
      :slot-key="slotKey || 'default'"
    />
    <div v-else class="conent"></div>
  </transition>
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
      this.reloadContent(key)
    }
  },

  methods: {
    loadContent (pageKey) {
      this.layout = null
      if (components[pageKey]) {
        if (!this.$ssrContext) {
          Vue.component(pageKey, components[pageKey])
          this.layout = pageKey
        }
      }
    },

    reloadContent (pageKey) {
      if (Vue.component(pageKey)) {
        return
      }
      this.layout = 'ContentLoading'
      if (components[pageKey]) {
        if (!this.$ssrContext) {
          Promise.all([
            components[pageKey](),
            new Promise(resolve => setTimeout(resolve, 300))
          ]).then(([comp]) => {
            this.$vuepress.$emit('AsyncMarkdownAssetLoaded', this.pageKey)
            Vue.component(pageKey, comp.default)
            this.layout = null
            setTimeout(() => {
              this.layout = pageKey
            })
          })
        }
      }
    }
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
