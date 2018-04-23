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
      const { locales = {}} = this.$site
      let targetLang
      let defaultLang
      for (const path in locales) {
        if (path === '/') {
          defaultLang = locales[path]
        } else if (this.$page.path.indexOf(path) === 0) {
          targetLang = locales[path]
        }
      }
      return targetLang || defaultLang || {}
    },
    $siteTitle () {
      return this.$localeConfig.title || this.$site.title || ''
    },
    $title () {
      const page = this.$page
      const siteTitle = this.$siteTitle
      const selfTitle = page.frontmatter.home ? null : (
        page.frontmatter.title || // explicit title
        page.title // inferred title
      )
      return siteTitle
        ? selfTitle
          ? (siteTitle + ' | ' + selfTitle)
          : siteTitle
        : selfTitle || 'VuePress'
    },
    $description () {
      return this.$page.frontmatter.description || this.$localeConfig.description || this.$site.description || ''
    },
    $lang () {
      return this.$page.frontmatter.lang || this.$localeConfig.lang || 'en-US'
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
