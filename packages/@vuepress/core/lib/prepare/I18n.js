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

module.exports = (store /* null in server side */) => class I18n {
  constructor (dataProvider) {
    this.__ssrContext = true
    this.__dataProvider = dataProvider
  }

  setSSRContext (context) {
    this.__ssrContext = context
  }

  get $site () {
    if (this.__ssrContext) {
      const siteData = this.__dataProvider()
      if (siteData.locales) {
        Object.keys(siteData.locales).forEach(path => {
          siteData.locales[path].path = path
        })
      }
      return siteData
    }
    return store.siteData
  }

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
  }

  get $siteTitle () {
    return this.$localeConfig.title || this.$site.title || ''
  }

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
  }

  get $description () {
    // #565 hoist description from meta
    if (this.$page.frontmatter.meta) {
      const descriptionMeta = this.$page.frontmatter.meta.filter(item => item.name === 'description')[0]
      if (descriptionMeta) return descriptionMeta.content
    }
    return this.$page.frontmatter.description || this.$localeConfig.description || this.$site.description || ''
  }

  get $lang () {
    return this.$page.frontmatter.lang || this.$localeConfig.lang || 'en-US'
  }

  get $localePath () {
    return this.$localeConfig.path || '/'
  }

  get $themeLocaleConfig () {
    return (this.$site.themeConfig.locales || {})[this.$localePath] || {}
  }

  get $page () {
    if (this.__ssrContext) {
      return this.__ssrContext
    }
    return findPageForPath(
      this.$site.pages,
      this.$route.path
    )
  }
}
