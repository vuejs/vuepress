<template>
  <transition :name="disableTransition ? null : 'fade'">
    <component
      v-if="layout"
      :is="layout"
      :slot-key="slotKey || 'default'"
    />
    <div v-else class="content"></div>
  </transition>
</template>

<script>
/* global CONTENT_LOADING */

import Vue from 'vue'
import ContentLoading from './ContentLoading'

const CONTENT_LOADING_COMPONENT = typeof CONTENT_LOADING === 'string'
  ? CONTENT_LOADING
  : 'ContentLoading'

export default {
  components: { ContentLoading },

  props: {
    pageKey: String,
    slotKey: {
      type: String,
      default: 'default'
    }
  },

  data () {
    return {
      layout: CONTENT_LOADING_COMPONENT,
      noTransition: true
    }
  },

  computed: {
    $pageKey () {
      return this.pageKey || this.$page.key
    },
    disableTransition () {
      return !this.layout || this.layout === CONTENT_LOADING_COMPONENT || this.noTransition
    }
  },

  created () {
    this.loadContent(this.$pageKey)
  },

  watch: {
    $pageKey (key) {
      this.$vuepress.$set('contentMounted', false)
      this.reloadContent(key)
    }
  },

  methods: {
    loadContent (pageKey) {
      this.layout = null
      if (this.$vuepress.isPageExists(pageKey)) {
        if (!this.$ssrContext) {
          this.$vuepress.registerPageAsyncComponent(pageKey)
          this.layout = pageKey
        }
      }
    },

    reloadContent (pageKey) {
      // When page has been loaded, disable transition.
      if (this.$vuepress.isPageLoaded(pageKey)) {
        this.layout = pageKey
        this.noTransition = true
        return
      }

      // Start to load unfetched page component.
      this.layout = CONTENT_LOADING_COMPONENT
      if (this.$vuepress.isPageExists(pageKey)) {
        this.noTransition = false
        if (!this.$ssrContext) {
          Promise.all([
            this.$vuepress.loadPageAsyncComponent(pageKey),
            new Promise(resolve => setTimeout(resolve, 1000))
          ]).then(([comp]) => {
            this.$vuepress.$emit('AsyncMarkdownAssetLoaded', this.pageKey)
            Vue.component(pageKey, comp.default)
            this.layout = null
            setTimeout(() => {
              this.layout = pageKey
              setTimeout(() => {
                this.$vuepress.$set('contentMounted', true)
                this.$vuepress.$emit('contentMounted', this.slotKey)
              })
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
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
