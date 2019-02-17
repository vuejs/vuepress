// reference: https://github.com/Oktavilla/markdown-it-table-of-contents

const slugify = (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'))
const defaults = {
  includeLevel: [1, 2],
  containerClass: 'table-of-contents',
  slugify,
  markerPattern: /^\[\[toc\]\]/im,
  listType: 'ul',
  format: undefined,
  forceFullToc: false
}

module.exports = (md, options) => {
  options = Object.assign({}, defaults, options)
  const tocRegexp = options.markerPattern

  function toc (state, silent) {
    var token
    var match

    // Reject if the token does not start with [
    if (state.src.charCodeAt(state.pos) !== 0x5B /* [ */) {
      return false
    }
    // Don't run any pairs in validation mode
    if (silent) {
      return false
    }

    // Detect TOC markdown
    match = tocRegexp.exec(state.src)
    match = !match ? [] : match.filter(function (m) { return m })
    if (match.length < 1) {
      return false
    }

    // Build content
    token = state.push('toc_open', 'toc', 1)
    token.markup = '[[toc]]'
    token = state.push('toc_body', '', 0)
    token = state.push('toc_close', 'toc', -1)

    // Update pos so the parser can continue
    var newline = state.src.indexOf('\n')
    if (newline !== -1) {
      state.pos = state.pos + newline
    } else {
      state.pos = state.pos + state.posMax + 1
    }

    return true
  }

  md.renderer.rules.toc_open = function (tokens, index) {
    return `<TOC class="${options.containerClass}" />`
  }

  // Insert TOC
  md.inline.ruler.after('emphasis', 'toc', toc)
}
