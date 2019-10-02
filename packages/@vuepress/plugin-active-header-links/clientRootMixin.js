/* global AHL_SIDEBAR_LINK_SELECTOR, AHL_HEADER_ANCHOR_SELECTOR */

import debounce from 'lodash.debounce'

export default {
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll: debounce(function () {
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

      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      )

      const bottomY = window.innerHeight + scrollTop

      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i]
        const nextAnchor = anchors[i + 1]

        const isActive = i === 0 && scrollTop === 0
          || (scrollTop >= anchor.parentElement.offsetTop + 10
            && (!nextAnchor || scrollTop < nextAnchor.parentElement.offsetTop - 10))

        const routeHash = decodeURIComponent(this.$route.hash)
        if (isActive && routeHash !== decodeURIComponent(anchor.hash)) {
          const activeAnchor = anchor
          // check if anchor is at the bottom of the page to keep $route.hash consistent
          if (bottomY === scrollHeight) {
            for (let j = i + 1; j < anchors.length; j++) {
              if (routeHash === decodeURIComponent(anchors[j].hash)) {
                return
              }
            }
          }
          this.$vuepress.$set('disableScrollBehavior', true)
          this.$router.replace(decodeURIComponent(activeAnchor.hash), () => {
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
