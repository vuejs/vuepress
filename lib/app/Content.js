export default {
  created () {
    if (this.$ssrContext) {
      this.$ssrContext.title = getTitle(this)
      this.$ssrContext.lang = getLang(this)
    }
  },
  mounted () {
    const updateMeta = () => {
      document.title = getTitle(this)
      document.documentElement.lang = getLang(this)
    }
    this.$watch('$page', updateMeta)
    updateMeta()
  },
  render (h) {
    const componentName = this.$page.path === '/'
      ? 'index'
      : this.$page.path
          .replace(/^\//, '')
          .replace(/\.html$/, '')
          .replace(/\//g, '-')
    return h('page-' + componentName)
  }
}

function getTitle (vm) {
  const selfTitle = (
    vm.$page.frontmatter.title || // explicit title
    vm.$page.title // inferred title
  )
  const siteTitle = vm.$site.title
  return siteTitle
    ? selfTitle
      ? siteTitle + ' | ' + selfTitle
      : siteTitle
    : selfTitle
      ? selfTitle
      : 'VuePress'
}

function getLang (vm) {
  return vm.$page.frontmatter.lang
}
