export default {
  created () {
    if (this.$ssrContext) {
      this.$ssrContext.title = getTitle(this)
      this.$ssrContext.lang = getLang(this)
    }
  },
  mounted () {
    let currentMetaTags
    const updateMeta = () => {
      document.title = getTitle(this)
      document.documentElement.lang = getLang(this)
      currentMetaTags = updateMetaTags(this, currentMetaTags)
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
      ? (siteTitle + ' | ' + selfTitle)
      : siteTitle
    : selfTitle || 'VuePress'
}

function getLang (vm) {
  return vm.$page.frontmatter.lang || 'en'
}

function updateMetaTags (vm, current) {
  if (current) {
    current.forEach(c => {
      document.head.removeChild(c)
    })
  }
  const data = vm.$page.frontmatter.meta
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
