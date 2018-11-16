/* global AHL_SIDEBAR_LINK_SELECTOR, AHL_HEADER_ANCHOR_SELECTOR, AHL_TOP_OFFSET */

import throttle from 'lodash.throttle'

function calculateCurrentAnchor (anchors) {
  const l = anchors.length
  if (anchors[0].top > 0 && anchors[0].top < 10) {
    return anchors[0]
  }

  if (anchors[l - 1].top < 0) {
    return anchors[l - 1]
  }

  for (let i = 0; i < l; i++) {
    const anchor = anchors[i]
    const nextAnchor = anchors[i + 1]
    if (anchor.top < 0 && nextAnchor.top > 0) {
      if (nextAnchor.top < 10) {
        return nextAnchor
      }
      return anchor
    }
  }

  return anchors[0]
}

function getAnchors () {
  const sidebarLinks = [].slice.call(document.querySelectorAll(AHL_SIDEBAR_LINK_SELECTOR))
  return [].slice
    .call(document.querySelectorAll(AHL_HEADER_ANCHOR_SELECTOR))
    .filter(anchor => sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash))
    .map(el => {
      return {
        el,
        hash: decodeURIComponent(el.hash),
        top: el.getBoundingClientRect().top - AHL_TOP_OFFSET
        /* AHL_TOP_OFFSET is to Subtract height of navbar & anchor's padding top */
      }
    })
}

let freezeScrollEvent = true

export default {
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path) {
        freezeScrollEvent = true
      }
      next()
    })

    this.$vuepress.$on('AsyncMarkdownContentMounted', (slotKey) => {
      // delay activation of scroll event
      setTimeout(() => {
        freezeScrollEvent = false
      }, 1000)
      if (slotKey === 'default') {
        window.addEventListener('scroll', () => this.onScroll(freezeScrollEvent))
      }
    })

    this.$vuepress.$on('AnchorHashChange', (anchor) => {
      // When user clicked sidebar links, we need to disable the scroll
      // event triggered.
      if (this.$route.hash === anchor.hash) {
        return
      }
      this.$vuepress.$set('disableScrollBehavior', true)
      this.$router.replace(decodeURIComponent(anchor.hash), () => {
        // execute after scrollBehavior handler.
        this.$nextTick(() => {
          this.$vuepress.$set('disableScrollBehavior', false)
        })
      })
    })
  },

  methods: {
    onScroll: throttle(function (freezeScrollEvent) {
      if (freezeScrollEvent) {
        return
      }
      const anchors = getAnchors()
      if (anchors.length === 0) {
        return
      }
      this.$lastAnchor = this.$currentAnchor
      this.$currentAnchor = calculateCurrentAnchor(anchors)
      if (!this.$lastAnchor || this.$lastAnchor.hash !== this.$currentAnchor.hash) {
        this.$vuepress.$emit('AnchorHashChange', this.$currentAnchor)
      }
    }, 300)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  }
}
