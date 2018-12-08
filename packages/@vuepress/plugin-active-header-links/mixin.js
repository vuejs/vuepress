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

function getAnchors (sidebarLinks) {
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

export default {
  mounted () {
    this.$vuepress.$on('AsyncMarkdownContentMounted', (slotKey) => {
      if (slotKey === 'default') {
        window.addEventListener('scroll', this.onScroll)
      }
    })

    this.$vuepress.$on('AnchorHashChange', (anchor) => {
      this.$router.replace(decodeURIComponent(anchor.hash))
    })
  },

  methods: {
    onScroll: throttle(function () {
      this.$sidebarLinks = [].slice.call(document.querySelectorAll(AHL_SIDEBAR_LINK_SELECTOR))
      const anchors = getAnchors(this.$sidebarLinks)
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
