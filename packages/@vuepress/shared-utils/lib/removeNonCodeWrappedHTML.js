// This method remove the raw HTML but reserve the HTML wrapped by `<code>`.
// e.g.
// Input: "<a> b",   Output: "b"
// Input: "`<a>` b", Output: "`<a>` b"
module.exports = function removeNonCodeWrappedHTML (str) {
  return String(str).replace(/(^|[^><`])<.*>([^><`]|$)/g, '$1$2')
}
