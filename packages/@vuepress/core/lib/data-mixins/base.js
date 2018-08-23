// This file would be used at both client and server side.

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

module.exports = function dataMixin (siteData, route) {
  return {
    computed: {
      $site () {
        return siteData
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
            ? (selfTitle + ' | ' + siteTitle)
            : siteTitle
          : selfTitle || 'VuePress'
      },

      $description () {
        // #565 hoist description from meta
        if (this.$page.frontmatter.meta) {
          const descriptionMeta = this.$page.frontmatter.meta.filter(item => item.name === 'description')[0]
          if (descriptionMeta) return descriptionMeta.content
        }
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
          route && route.path || this.$route.path
        )
      }
    }
  }
}

