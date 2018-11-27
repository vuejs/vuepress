import SmoothScroll from 'smooth-scroll/dist/smooth-scroll.js'

export default {
  created () {
    this.$vuepress.$on('AsyncMarkdownContentMounted', () => {
      this.$vuepress.$set('contentMounted', true)

      this.$smoothScroll = new SmoothScroll('a[href*="#"]', {
        speed: 1,
        speedAsDuration: true,
        easing: 'easeInOutCubic'
      })

      if (this.$route.hash) {
        const hash = decodeURIComponent(this.$route.hash)
        try {
          const anchor = document.getElementById(hash.slice(1))
          const anchorLink = anchor.querySelector('a.header-anchor')
          setTimeout(() => {
            window.scroll({
              top: anchorLink.offsetTop - 70,
              left: 0,
              behavior: 'auto'
            })
          })
        } catch (e) {
          console.error(e)
        }
      }
    })
  },

  watch: {
    '$route.path' () {
      this.$vuepress.$set('contentMounted', false)
      this.$smoothScroll.destroy()
    }
  },

  beforeDestroy () {
    this.$smoothScroll.destroy()
  }
}
