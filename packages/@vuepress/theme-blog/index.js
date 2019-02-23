module.exports = {
  plugins: [
    '@vuepress/blog',
    '@vuepress/pagination',
    '@vuepress/medium-zoom',
    ['@vuepress/search', {
      searchMaxSuggestions: 10,
      test: null
    }]
  ]
}
