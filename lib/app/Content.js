export default {
  created () {
    if (this.$ssrContext) {
      this.$ssrContext.title = getMetadata(this, 'title') || 'VuePress'
      this.$ssrContext.lang = getMetadata(this, 'lang') || 'en'
    }
  },
  mounted () {
    const updateMeta = () => {
      document.title = getMetadata(this, 'title') || 'VuePress'
      document.documentElement.lang = getMetadata(this, 'lang') || 'en'
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

function getMetadata (vm, key) {
  return vm.$page.frontmatter[key] || vm.$page[key] || vm.$site[key]
}
