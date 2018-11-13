export default {
  created () {
    this.$vuepress.$on('AsyncMarkdownContentMounted', () => {
      this.$vuepress.$set('contentMounted', true)

      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault()
          window.scroll({
            top: e.target.offsetTop - 75,
            left: 0,
            behavior: 'smooth'
          })
        })
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
    }
  }
}
