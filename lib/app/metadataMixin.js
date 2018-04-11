import { siteData } from './.temp/siteData'
import { findPageForPath } from './util'

if (module.hot) {
  module.hot.accept('./.temp/siteData', () => {
    const { siteData } = require('./.temp/siteData')
    console.log(`reload from mixin: ` + siteData)
  })
}

siteData.pages.forEach(page => {
  if (!page.frontmatter) {
    page.frontmatter = {}
  }
})

export default {
  computed: {
    $site () {
      return siteData
    },
    $page () {
      return findPageForPath(
        this.$site.pages,
        this.$route.path
      )
    }
  }
}
