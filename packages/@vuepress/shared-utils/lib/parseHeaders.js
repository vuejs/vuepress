// Since VuePress needs to extract the header from the markdown source
// file and display it in the sidebar or title (#238), this file simply
// removes some unnecessary elements to make header displays well at
// sidebar or title.
//
// But header's parsing in the markdown content is done by the markdown
// loader based on markdown-it. markdown-it parser will will always keep
// HTML in headers, so in VuePress, after being parsed by the markdiwn
// loader, the raw HTML in headers will finally be parsed by Vue-loader.
// so that we can write HTML/Vue in the header. One exception is the HTML
// wrapped by <code>(markdown token: '`') tag.

const removeMarkdownTokens = str => String(str)
  .replace(/\[(.*)\]\(.*\)/, '$1')              // []()
  .replace(/(`|\*{1,3}|_)(.*?[^\\])\1/g, '$2')  // `{t}` | *{t}* | **{t}** | ***{t}*** | _{t}_
  .replace(/(\\)(\*|_|`|\!)/g, '$2')            // remove escape char '\'

const trim = str => str.trim()

// Unescape html, parse emojis and remove some md tokens.
module.exports = require('./compose')(
  require('./unescapeHtml'),
  require('./parseEmojis'),
  removeMarkdownTokens,
  trim
)

