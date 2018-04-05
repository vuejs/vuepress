export default {
  created () {
    if (this.$ssrContext) {
      const title = getMetadata(this, 'title')
      if (title) {
        this.$ssrContext.title = title
      }

      const lang = getMetadata(this, 'lang')
      if (lang) {
        this.$ssrContext.lang = lang
      }
    }
  },
  mounted () {
    const title = getMetadata(this, 'title')
    if (title) {
      document.title = title
    }

    const lang = getMetadata(this, 'lang')
    if (lang) {
      document.documentElement.lang = lang
    }
  },
  render (h) {
    return h(this.$page.componentName)
  }
}

function getMetadata (vm, key) {
  return vm.$page.frontmatter[key] || vm.$page[key]
}
