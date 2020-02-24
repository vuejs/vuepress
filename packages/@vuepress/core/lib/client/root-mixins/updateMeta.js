import unionBy from 'lodash/unionBy'

export default {
  created () {
    if (this.$ssrContext) {
      this.$ssrContext.title = this.$title
      this.$ssrContext.lang = this.$lang
      this.$ssrContext.description = this.$page.description || this.$description
    }
  },

  mounted () {
    // init currentMetaTags from DOM
    this.currentMetaTags = [...document.querySelectorAll('meta')]

    // indirectly init siteMetaTags from DOM
    this.siteMetaTags = this.currentMetaTags.map(element => {
      const siteMeta = {}
      for (const attribute of element.attributes) {
        siteMeta[attribute.name] = attribute.value
      }
      return siteMeta
    })

    // update title / meta tags
    this.updateMeta()
  },

  methods: {
    updateMeta () {
      document.title = this.$title
      document.documentElement.lang = this.$lang

      const pageMetaTags = (this.$page.frontmatter.meta || []).slice(0)
      // pageMetaTags have higher priority than siteMetaTags
      // description needs special attention for it has too many entries
      const newMetaTags = unionBy([{ name: 'description', content: this.$description }],
        pageMetaTags, this.siteMetaTags, metaIdentifier)

      this.currentMetaTags = updateMetaTags(newMetaTags, this.currentMetaTags)
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

/**
 * Replace currentMetaTags with newMetaTags
 * @param {Array<Object>} newMetaTags
 * @param {Array<HTMLElement>} currentMetaTags
 * @returns {Array<HTMLElement>}
 */
function updateMetaTags (newMetaTags, currentMetaTags) {
  if (currentMetaTags) {
    [...currentMetaTags].forEach(c => {
      document.head.removeChild(c)
    })
  }
  if (newMetaTags) {
    return newMetaTags.map(m => {
      const tag = document.createElement('meta')
      Object.keys(m).forEach(key => {
        tag.setAttribute(key, m[key])
      })
      document.head.appendChild(tag)
      return tag
    })
  }
}

/**
 * Try to identify a meta tag by name, property or itemprop
 *
 * Return a complete string if none provided
 * @param {Object} tag from frontmatter or siteMetaTags
 * @returns {String}
 */
function metaIdentifier (tag) {
  for (const item of ['name', 'property', 'itemprop']) {
    if (tag.hasOwnProperty(item)) return tag[item] + item
  }
  return JSON.stringify(tag)
}
