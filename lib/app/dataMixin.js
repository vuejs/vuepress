import Vue from 'vue'
import { siteData } from './.temp/siteData'
import { findPageForPath } from './util'

function prepare (siteData) {
  siteData.pages.forEach(page => {
    if (!page.frontmatter) {
      page.frontmatter = {}
    }
  })
  if (siteData.langs) {
    Object.keys(siteData.langs).forEach(path => {
      siteData.langs[path].path = path
    })
  }
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
    $langConfig () {
      const { langs } = this.$site
      let targetLang
      let defaultLang
      Object.keys(langs).forEach(path => {
        if (path === '/') {
          defaultLang = langs[path]
        } else if (this.$page.path.indexOf(path) === 0) {
          targetLang = langs[path]
        }
      })
      return targetLang || defaultLang || {}
    },
    $title () {
      return this.$langConfig.title || this.$site.title || ''
    },
    $description () {
      return this.$langConfig.description || this.$site.description || ''
    },
    $lang () {
      return this.$langConfig.lang || 'en-US'
    },
    $localePath () {
      return this.$langConfig.path || '/'
    },
    $page () {
      return findPageForPath(
        this.$site.pages,
        this.$route.path
      )
    }
  }
}
