export default {
  created () {
    this.$vuepress.$on('AsyncMarkdownContentMounted', () => {
      this.$vuepress.$set('contentMounted', true)
    })
  },

  watch: {
    '$route.path' () {
      this.$vuepress.$set('contentMounted', false)
    }
  }
}
