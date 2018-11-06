export default {
  created () {
    this.$vuepress.$on('AsyncMarkdownContentMounted', () => {
      this.$vuepress.$set('contentMounted', true)
    })
  },

  watch: {
    $page () {
      this.$vuepress.$set('contentMounted', false)
    }
  }
}
