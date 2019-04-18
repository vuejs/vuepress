export default {
  created () {
    if (this.$ssrContext) {
      this.$ssrContext.title = this.$title
      this.$ssrContext.lang = this.$lang
      this.$ssrContext.description = this.$page.description || this.$description
    }
  },

  mounted () {
    // update title / meta tags
    this.currentMetaTags = new Set()
    this.updateMeta()
  },

  methods: {
    updateMeta () {
      document.title = this.$title
      document.documentElement.lang = this.$lang
      const userMeta = this.$page.frontmatter.meta || []
      const meta = userMeta.slice(0)
      const useGlobalDescription = userMeta.filter(m => m.name === 'description').length === 0

      // #665 Avoid duplicate description meta at runtime.
      if (useGlobalDescription) {
        meta.push({ name: 'description', content: this.$description })
      }

      // Including description meta coming from SSR.
      const descriptionMetas = document.querySelectorAll('meta[name="description"]')
      if (descriptionMetas.length) {
        descriptionMetas.forEach(m => this.currentMetaTags.add(m))
      }

      this.currentMetaTags = new Set(updateMetaTags(meta, this.currentMetaTags))
    }
  },

  watch: {
    $page () {
      this.updateMeta()
    }
  },

  beforeDestroy () {
    updateMetaTags(null, this.currentMetaTags)
  }
}

function updateMetaTags (meta, current) {
  if (current) {
    [...current].forEach(c => {
      document.head.removeChild(c)
    })
  }
  if (meta) {
    return meta.map(m => {
      const tag = document.createElement('meta')
      Object.keys(m).forEach(key => {
        tag.setAttribute(key, m[key])
      })
      document.head.appendChild(tag)
      return tag
    })
  }
}
