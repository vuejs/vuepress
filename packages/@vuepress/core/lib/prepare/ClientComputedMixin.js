'use strict'

/**
 * Get page data via path (permalink).
 *
 * @param {array} pages
 * @param {string} path
 * @returns {object}
 */

function findPageForPath (pages, path) {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    if (page.path === path) {
      return page
    }
  }
  return {
    path: '',
    frontmatter: {}
  }
}

/**
 * Expose a function to get ClientComputedMixin constructor.
 * Note that this file will run in both server and client side.
 *
 * @param {object} siteData
 * @returns {ClientComputedMixin}
 */

module.exports = siteData => {
  // We cannot use class here. webpack will throw error.
  function ClientComputedMixin () {}

  ClientComputedMixin.prototype = {
    setPage (page) {
      this.__page = page
    },

    get $site () {
      return siteData
    },

    get $themeConfig () {
      return this.$site.themeConfig
    },

    get $localeConfig () {
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

    get $siteTitle () {
      return this.$localeConfig.title || this.$site.title || ''
    },

    get $title () {
      const page = this.$page
      const siteTitle = this.$siteTitle
      const selfTitle = page.frontmatter.home ? null : (
        page.frontmatter.title || // explicit title
        page.title // inferred title
      )
      return siteTitle
        ? selfTitle
          ? (selfTitle + ' | ' + siteTitle)
          : siteTitle
        : selfTitle || 'VuePress'
    },

    get $description () {
      // #565 hoist description from meta
      const description = getMetaDescription(this.$page.frontmatter.meta)
      if (description) {
        return description
      }
      // if (this.$page.frontmatter.meta) {
      //   const descriptionMeta = this.$page.frontmatter.meta.filter(item => item.name === 'description')[0]
      //   if (descriptionMeta) return descriptionMeta.content
      // }
      return this.$page.frontmatter.description || this.$localeConfig.description || this.$site.description || ''
    },

    get $lang () {
      return this.$page.frontmatter.lang || this.$localeConfig.lang || 'en-US'
    },

    get $localePath () {
      return this.$localeConfig.path || '/'
    },

    get $themeLocaleConfig () {
      return (this.$site.themeConfig.locales || {})[this.$localePath] || {}
    },

    get $page () {
      if (this.__page) {
        return this.__page
      }
      return findPageForPath(
        this.$site.pages,
        this.$route.path
      )
    }
  }

  return ClientComputedMixin
}

function getMetaDescription (meta) {
  if (meta) {
    // Why '(() => 'name')()' ?
    // You can use item.name directly and see what happened.
    // "How many pits did webpack bury?"
    const descriptionMeta = meta.filter(item => item[(() => 'name')()] === 'description')[0]
    if (descriptionMeta) return descriptionMeta.content
  }
}
