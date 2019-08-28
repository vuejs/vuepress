import compose from './compose'
import parseHeaders from './parseHeaders'
import removeNonCodeWrappedHTML from './removeNonCodeWrappedHTML'

// Also clean the html that isn't wrapped by code.
// Because we want to support using VUE components in headers.
// e.g. https://vuepress.vuejs.org/guide/using-vue.html#badge
export = compose(
  removeNonCodeWrappedHTML,
  parseHeaders
)

