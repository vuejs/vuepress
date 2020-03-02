// Reference: https://github.com/Oktavilla/markdown-it-table-of-contents
const defaults = {
  includeLevel: [2, 3],
  containerClass: 'table-of-contents',
  slugify: undefined,
  markerPattern: /^\[\[toc\]\]/im,
  listType: 'ul',
  format: undefined,
  forceFullToc: false,
  containerHeaderHtml: undefined,
  containerFooterHtml: undefined,
  transformLink: undefined
}

module.exports = (md, options) => {
  options = Object.assign({}, defaults, options)
  var gstate

  // Insert TOC rules after emphasis
  md.inline.ruler.after('emphasis', 'toc', toc)

  function toc (state, silent) {
    /**
     * Reject if
     * 1. in validation mode
     * 2. token does not start with [
     * 3. it's not [[toc]]
     */
    if (silent // validation mode
      || state.src.charCodeAt(state.pos) !== 0x5B /* [ */
      || !options.markerPattern.test(state.src.substr(state.pos))) {
      return false
    }

    // Build content
    state.push('toc_open', 'toc', 1)
    state.push('toc_body', '', 0)
    state.push('toc_close', 'toc', -1)

    // Update pos so the parser can continue
    const newline = state.src.indexOf('\n', state.pos)

    state.pos = newline !== -1
      ? newline
      : state.pos + state.posMax + 1

    return true
  }

  md.renderer.rules.toc_open = function () {
    var tocOpenHtml = `</p><div class="${options.containerClass}">`

    if (options.containerHeaderHtml) {
      tocOpenHtml += options.containerHeaderHtml
    }

    return tocOpenHtml
  }

  md.renderer.rules.toc_close = function () {
    var tocFooterHtml = ''

    if (options.containerFooterHtml) {
      tocFooterHtml = options.containerFooterHtml
    }

    return tocFooterHtml + `</div><p>`
  }

  md.renderer.rules.toc_body = function () {
    if (options.forceFullToc) {
      /*

      Renders full TOC even if the hierarchy of headers contains
      a header greater than the first appearing header

      ## heading 2
      ### heading 3
      # heading 1

      Result TOC:
      - heading 2
         - heading 3
      - heading 1
      */
      let tocBody = ''
      let pos = 0
      const tokenLength = gstate && gstate.tokens && gstate.tokens.length

      while (pos < tokenLength) {
        const tocHierarchy = renderChildsTokens(pos, gstate.tokens)
        pos = tocHierarchy[0]
        tocBody += tocHierarchy[1]
      }

      return tocBody
    } else {
      return renderChildsTokens(0, gstate.tokens)[1]
    }
  }

  function renderChildsTokens (pos, tokens) {
    var headings = []
    var buffer = ''
    var currentLevel
    var subHeadings
    var size = tokens.length
    var i = pos
    while (i < size) {
      const token = tokens[i]
      const heading = tokens[i - 1]
      var level = token.tag && parseInt(token.tag.substr(1, 1))
      if (token.type !== 'heading_close' || options.includeLevel.indexOf(level) === -1 || heading.type !== 'inline') {
        i++; continue // Skip if not matching criteria
      }
      if (!currentLevel) {
        currentLevel = level// We init with the first found level
      } else {
        if (level > currentLevel) {
          subHeadings = renderChildsTokens(i, tokens)
          buffer += subHeadings[1]
          i = subHeadings[0]
          continue
        }
        if (level < currentLevel) {
          // Finishing the sub headings
          buffer += `</li>`
          headings.push(buffer)
          return [i, `<${options.listType}>${headings.join('')}</${options.listType}>`]
        }
        if (level === currentLevel) {
          // Finishing the sub headings
          buffer += `</li>`
          headings.push(buffer)
        }
      }
      let link = tokens[i - 2].attrGet('id')
        ? tokens[i - 2].attrGet('id')
        : options.slugify(heading.content)

      link = '#' + link
      if (options.transformLink) {
        link = options.transformLink(link)
      }
      buffer = `<li><a href="${link}">`
      buffer += typeof options.format === 'function' ? options.format(heading.content) : heading.content
      buffer += `</a>`
      i++
    }
    buffer += buffer === '' ? '' : `</li>`
    headings.push(buffer)
    return [i, `<${options.listType}>${headings.join('')}</${options.listType}>`]
  }

  // Catch all the tokens for iteration later
  md.core.ruler.push('grab_state', state => {
    gstate = state
  })
}
