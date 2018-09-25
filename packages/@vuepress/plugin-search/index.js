const path = require('path')

module.exports = (options) => ({
  alias: {
    '@SearchBox':
      path.resolve(__dirname, 'SearchBox.vue')
  },
  define: {
    SEARCH_MAX_SUGGESTIONS: options.searchMaxSuggestions || 5
  }
})
