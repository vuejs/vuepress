import Vue from 'vue'
import { siteData } from './.temp/siteData'
import { findPageForPath } from './util'

function prepare (siteData) {
  siteData.pages.forEach(page => {
    if (!page.frontmatter) {
      page.frontmatter = {}
    }
  })
  if (siteData.locales) {
    Object.keys(siteData.locales).forEach(path => {
      siteData.locales[path].path = path
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
    $localeConfig () {
      const { locales } = this.$site
      let targetLang
      let defaultLang
      Object.keys(locales).forEach(path => {
        if (path === '/') {
          defaultLang = locales[path]
        } else if (this.$page.path.indexOf(path) === 0) {
          targetLang = locales[path]
        }
      })
      return targetLang || defaultLang || {}
    },
    $title () {
      return this.$localeConfig.title || this.$site.title || ''
    },
    $description () {
      return this.$localeConfig.description || this.$site.description || ''
    },
    $lang () {
      return this.$localeConfig.lang || 'en-US'
    },
    $localePath () {
      return this.$localeConfig.path || '/'
    },
    $themeLocaleConfig () {
      return (this.$site.themeConfig.locales || {})[this.$localePath] || {}
    },
    $page () {
      return findPageForPath(
        this.$site.pages,
        this.$route.path
      )
    }
  }
}
