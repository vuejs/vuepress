const { compose } = require('./shared')

const parseEmojis = str => {
  const emojiData = require('markdown-it-emoji/lib/data/full.json')
  return String(str).replace(/:(.+?):/g, (placeholder, key) => emojiData[key] || placeholder)
}

const unescapeHtml = html => String(html)
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, '\'')
  .replace(/&#x3A;/g, ':')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')

const removeMarkdownToken = str => String(str)
  .replace(/\[(.*)\]\(.*\)/, '$1')              // []()
  .replace(/(`|\*{1,3}|_)(.*?[^\\])\1/g, '$2')  // `{t}` | *{t}* | **{t}** | ***{t}*** | _{t}_
  .replace(/(\\)(\*|_|`)/g, '$2')               // remove escape char '\'

exports.removeTailHtml = (str) => {
  return String(str).replace(/\s*?<.*>\s*$/g, '')
}

// Only remove some md tokens.
exports.parseHeaders = compose(
  unescapeHtml,
  parseEmojis,
  removeMarkdownToken
)

// Also clean the tail html in headers.
// Since we want to support tailed badge in headers.
// See: https://vuepress.vuejs.org/guide/using-vue.html#badge
exports.deeplyParseHeaders = compose(
  exports.removeTailHtml,
  exports.parseHeaders,
)
