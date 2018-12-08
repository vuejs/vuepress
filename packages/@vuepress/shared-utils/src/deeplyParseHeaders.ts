import compose from './compose'
import parseHeaders from './parseHeaders'

// This method remove the raw HTML but reserve the HTML wrapped by `<code>`.
// e.g.
// Input: "<a> b",   Output: "b"
// Input: "`<a>` b", Output: "`<a>` b"
export function removeNonCodeWrappedHTML (str: string): string {
  return String(str).replace(/(^|[^><`])<.*>([^><`]|$)/g, '$1$2')
}

// Also clean the html that isn't wrapped by code.
// Because we want to support using VUE components in headers.
// e.g. https://vuepress.vuejs.org/guide/using-vue.html#badge
export default compose(
  removeNonCodeWrappedHTML,
  parseHeaders
)

