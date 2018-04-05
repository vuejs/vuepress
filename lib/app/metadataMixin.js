import { siteData } from './.temp/siteData'

export default {
  computed: {
    $site () {
      return siteData
    },
    $page () {
      const pages = siteData.pages
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        if (page.path === this.$route.path) {
          page.frontmatter = page.frontmatter || {}
          return page
        }
      }
    }
  }
}
