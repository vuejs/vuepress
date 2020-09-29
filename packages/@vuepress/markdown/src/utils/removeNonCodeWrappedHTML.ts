// This method remove the raw HTML but reserve the HTML wrapped by `<code>`.
// e.g.
// Input: "<a> b",   Output: "b"
// Input: "`<a>` b", Output: "`<a>` b"
export const removeNonCodeWrappedHTML = (str: string): string =>
  str.replace(/(^|[^><`])<.*>([^><`]|$)/g, '$1$2')
