// This method remove the raw HTML but reserve the HTML wrapped by `<code>`.
// e.g.
// Input: "<a> b",   Output: "b"
// Input: "`<a>` b", Output: "`<a>` b"
function removeNonCodeWrappedHTML (str) {
  return String(str).replace(/(^|[^><`])<.*>([^><`]|$)/g, '$1$2')
}

// Also clean the html that isn't wrapped by code.
// Because we want to support using VUE components in headers.
// e.g. https://vuepress.vuejs.org/guide/using-vue.html#badge
module.exports = require('./compose')(
  removeNonCodeWrappedHTML,
  require('./parseHeaders')
)

module.exports.removeNonCodeWrappedHTML = removeNonCodeWrappedHTML
