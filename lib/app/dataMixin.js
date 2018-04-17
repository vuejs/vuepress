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
    $langObject () {
      const { langs } = this.$site
      let defaultLang
      const lang = (langs || []).find((lang, index) => {
        if (lang.path === '/') {
          defaultLang = langs[index]
        } else {
          return this.$page.path.startsWith(lang.path)
        }
      })
      return lang || defaultLang
    },
    $lang () {
      return this.$langObject && this.$langObject.lang || 'en'
    },
    $basepath () {
      return this.$langObject && this.$langObject.path || '/'
    },
    $locale () {
      if (Array.isArray(this.$site.themeConfig.nav)) {
        return 'default'
      }
      const locales = Object.keys(this.$site.themeConfig.nav)
      const locale = locales.find(locale => this.$page.path.startsWith('/' + locale))
      return locale || 'default'
    },
    $page () {
      return findPageForPath(
        this.$site.pages,
        this.$route.path
      )
    }
  }
}
