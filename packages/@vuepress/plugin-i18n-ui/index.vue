<template>
  <div class="theme-container" id="vuepress-plugin-i18n-ui">
    <div class="tool-box">
      <span class="select-lang">Language:&nbsp;</span>
      <select>
        <option v-for="locale in localeList">
          {{ locale.label + '(' + locale.url + ')'}}
        </option>
      </select>
      <span class="select-page">Page:&nbsp;</span>
      <select @change="handlePageChange">
        <option v-for="page in pages">{{ page.path }}</option>
      </select>
    </div>

    <div class="helper-content">
      <div id="left">
        <transition name="slide-left">
          <Content :page-key="key"/>
        </transition>
      </div>
      <div id="right">
        <transition name="slide-left">
          <Content :page-key="rightKey"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { findPageForPath } from '@app/util'

export default {
  data () {
    return {
      currentPagePath: '/'
    }
  },

  mounted () {
    syncScroll()
  },

  computed: {
    key () {
      return this.currentPage.key
    },

    currentPage () {
      return findPageForPath(this.$site.pages, this.currentPagePath)
    },

    rightKey () {
      return this.rightPage.key
    },

    rightPage () {
      return findPageForPath(this.$site.pages, this.rightLocale + this.currentPagePath.slice(1))
    },

    rightLocale () {
      return this.localeList[0].url
    },

    localeList () {
      const locales = this.$site.themeConfig.locales
      const localeList = []
      Object.keys(locales).forEach(url => {
        if (url !== '/') {
          localeList.push(Object.assign({ url }, locales[url]))
        }
      })
      return localeList
    },

    pages () {
      return this.$site.pages
        .filter(page => this.localeList.every(locale => page.path.indexOf(locale.url) !== 0))
        .filter(page => page.path !== '/translation/')
    }
  },

  methods: {
    handlePageChange (e) {
      this.currentPagePath = e.target.value
    }
  }

}

function syncScroll () {
  const left = document.querySelector('#left')
  const right = document.querySelector('#right')

  function getOther (el) {
    if (el === left) return right
    return left
  }

  function onScroll (e) {
    const el = e.target
    const other = getOther(el)
    other.removeEventListener('scroll', onScroll)
    const percentage = el.scrollTop / (el.scrollHeight - el.offsetHeight)
    other.scrollTop = percentage * (other.scrollHeight - other.offsetHeight)
    setTimeout(() => other.addEventListener('scroll', onScroll, false), 10)
  }

  left.addEventListener('scroll', onScroll, false)
  right.addEventListener('scroll', onScroll, false)
}
</script>

<style lang="stylus" scoped>
  #vuepress-plugin-i18n-ui
    .helper-content
      position relative

    .tool-box
      height 4rem
      line-height 4rem
      text-align center
      .select-lang ~ select
        margin-right 10px

    #left, #right
      padding 70px
      box-sizing border-box
      position absolute
      top 0
      width 50%
      min-height 100px
      max-height calc(100vh - 3.6rem - 4rem)
      overflow scroll
    #left
      left 0
    #right
      left 50%

  .slide-left-enter-active
    transition all .5s
    opacity 1

  .slide-left-enter
    opacity 0
    position absolute !important
    transform translate(-5%) !important

  .slide-left-leave-to
    opacity 0
    position absolute !important
    transform: translate(5%) !important
</style>
