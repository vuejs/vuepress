/* global AHL_SIDEBAR_LINK_SELECTOR, AHL_HEADER_ANCHOR_SELECTOR */

import debounce from 'lodash.debounce'

export default {
  mounted () {
    this.activationLink()
    this.isInViewPortOfOne()
    window.addEventListener('scroll', this.onScroll)
  },
  
  updated: function () {
    this.isInViewPortOfOne()
  },

  methods: {
    activationLink() {
      const subtitles = [].slice.call(document.querySelectorAll(AHL_SIDEBAR_LINK_SELECTOR))
        .filter(subtitle => decodeURIComponent(this.$route.hash) == decodeURIComponent(subtitle.hash))
      if (subtitles == null || subtitles.length < 1 || subtitles[0].offsetTop == undefined) return
      subtitles[0].click()
    },

    isInViewPortOfOne() {
      let siderbarScroll = document.getElementsByClassName("sidebar")[0]
      let el = document.getElementsByClassName("active sidebar-link")[1]
      if (el == null || el == undefined || el.offsetTop == undefined) {
        el = document.getElementsByClassName("active sidebar-link")[0]
      }
      if (el == null || el == undefined || el.offsetTop == undefined) return

      const viewPortHeight = siderbarScroll.clientHeight || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      let offsetTop = el.offsetTop
      let offsetBottom = el.offsetTop + el.offsetHeight
      let scrollTop = siderbarScroll.scrollTop
      let bottomVisible = (offsetBottom <= viewPortHeight + scrollTop)
      if (!bottomVisible) {
        siderbarScroll.scrollTop = (offsetBottom + 5 - viewPortHeight)
      }
      let topVisible = (offsetTop >= scrollTop)
      if (!topVisible) {
        siderbarScroll.scrollTop = (offsetTop - 5)
      }
    },
    
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
