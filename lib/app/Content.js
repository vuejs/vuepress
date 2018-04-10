import { pathToComponentName, getTitle, getLang } from './util'

export default {
  created () {
    if (this.$ssrContext) {
      this.$ssrContext.title = getTitle(this.$page)
      this.$ssrContext.lang = getLang(this.$page)
    }
  },

  beforeMount () {
    this.currentMetaTags = []
    const updateMeta = () => {
      document.title = getTitle(this.$page)
      document.documentElement.lang = getLang(this.$page)
      this.currentMetaTags = updateMetaTags(this.$page, this.currentMetaTags)
    }
    this.$watch('$page', updateMeta)
    updateMeta()
  },

  beforeDestroy () {
    updateMetaTags(null, this.currentMetaTags)
  },

  render (h) {
    return h(pathToComponentName(this.$page.path))
  }
}

function updateMetaTags (page, current) {
  if (current) {
    current.forEach(c => {
      document.head.removeChild(c)
    })
  }
  const data = page && page.frontmatter.meta
  if (data) {
    return data.map(m => {
      const tag = document.createElement('meta')
      Object.keys(m).forEach(key => {
        tag.setAttribute(key, m[key])
      })
      document.head.appendChild(tag)
      return tag
    })
  }
}
