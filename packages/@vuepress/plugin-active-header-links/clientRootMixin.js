/* global AHL_SIDEBAR_LINK_SELECTOR, AHL_HEADER_ANCHOR_SELECTOR */

import throttle from 'lodash.throttle'

export default {
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll: throttle(function () {
      this.setActiveHash()
    }, 300),

    setActiveHash () {
      const sidebarLinks = [].slice.call(document.querySelectorAll(AHL_SIDEBAR_LINK_SELECTOR))
      const anchors = [].slice.call(document.querySelectorAll(AHL_HEADER_ANCHOR_SELECTOR))
        .filter(anchor => sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash))

      const scrollTop = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      )

      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i]
        const nextAnchor = anchors[i + 1]

        const isActive = i === 0 && scrollTop === 0
          || (scrollTop >= anchor.parentElement.offsetTop + 10
            && (!nextAnchor || scrollTop < nextAnchor.parentElement.offsetTop - 10))

        if (isActive && decodeURIComponent(this.$route.hash) !== decodeURIComponent(anchor.hash)) {
          this.$vuepress.$set('disableScrollBehavior', true)
          this.$router.replace(decodeURIComponent(anchor.hash), () => {
            // execute after scrollBehavior handler.
            this.$nextTick(() => {
              this.$vuepress.$set('disableScrollBehavior', false)
            })
          })
          return
        }
      }
    }
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  }
}
