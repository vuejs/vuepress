import Vue from 'vue'
import { siteData } from './.temp/siteData'
import { findPageForPath } from './util'

function prepare (siteData) {
  siteData.pages.forEach(page => {
    if (!page.frontmatter) {
      page.frontmatter = {}
    }
  })
  Object.freeze(siteData)
}

prepare(siteData)
const store = new Vue({
  data: { siteData }
})

if (module.hot) {
  module.hot.accept('./.temp/siteData', () => {
    prepare(siteData)
    store.siteData = siteData
  })
}

export default {
  computed: {
    $site () {
      return store.siteData
    },
    $title () {
      const title = this.$site.title
      return typeof title === 'object'
        ? title[this.$basepath]
        : title
    },
    $description () {
      const description = this.$site.description
      return typeof description === 'object'
        ? description[this.$basepath]
        : description
    },
    $langConfig () {
      const { langs } = this.$site
      let targetLang
      let defaultLang
      (langs || []).forEach((lang, index) => {
        if (lang.path === '/') {
          defaultLang = langs[index]
        } else if (this.$page.path.indexOf(lang.path) === 0) {
          targetLang = langs[index]
        }
      })
      return targetLang || defaultLang
    },
    $lang () {
      return this.$langConfig && this.$langConfig.lang || 'en'
    },
    $basepath () {
      return this.$langConfig && this.$langConfig.path || '/'
    },
    $page () {
      return findPageForPath(
        this.$site.pages,
        this.$route.path
      )
    }
  }
}
