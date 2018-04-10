import { siteData } from './.temp/siteData'
import { findPageForPath } from './util'

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
      return findPageForPath(this.$route.path)
    }
  }
}
