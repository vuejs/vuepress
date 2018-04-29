const parseEmojis = str => {
  const emojiData = require('markdown-it-emoji/lib/data/full.json')
  return str.replace(/:(.+?):/g, (placeholder, key) => emojiData[key] || placeholder)
}

const unescapeHtml = html => html
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, '\'')
  .replace(/&#x3A;/g, ':')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')

const removeMarkdownToken = str => str
  .replace(/`(.*)`/, '$1')  // ``
  .replace(/\[(.*)\]\(.*\)/, '$1')  // []()
  .replace(/\*\*(.*)\*\*/, '$1')  // **
  .replace(/\*(.*)\*/, '$1')  // *
  .replace(/_(.*)_/, '$1')  // _

// put here to avoid circular references
const compose = (...processors) => {
  if (processors.length === 0) return input => input
  if (processors.length === 1) return processors[0]
  return processors.reduce((prev, next) => {
    return (...args) => next(prev(...args))
  })
}

module.exports = compose(unescapeHtml, parseEmojis, removeMarkdownToken)
