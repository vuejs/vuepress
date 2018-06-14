<template>
  <div id="translation-helper">
    <div>Choose a page you want to translate</div>
    <div class="helper-content">
      <div id="left">
        <Content :page-key="key"/>
      </div>
      <div id="right"></div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import { findPageForPath } from '@app/util'
// import { findPageForPath } from '@app/util'
export default {
  data () {
    return {
      currentPath: '/'
    }
  },
  computed: {
    key () {
      return this.currentPage.key
    },
    currentPage () {
      return findPageForPath(this.$site.pages, this.currentPath)
    }
  }
}
</script>

<style lang="stylus">
  #translation-helper
    .helper-content
      position relative
    #left, #right
      position absolute
      top 0
      width 50%
      min-height 100px
    #left
      background-color antiquewhite
      left 0
    #right
      background-color aliceblue
      left 50%

</style>
