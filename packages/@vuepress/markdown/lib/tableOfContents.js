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
  var gStateTokens

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

      for (let pos = 0; pos < gStateTokens.length;) {
        const [nextPos, subBody] = renderChildrenTokens(pos, gStateTokens)
        pos = nextPos
        tocBody += subBody
      }

      return tocBody
    } else {
      return renderChildrenTokens(0, gStateTokens)[1]
    }
  }

  function renderChildrenTokens (pos, tokens) {
    const headings = []
    for (let i = pos, currentLevel; i < tokens.length; i++) {
      const level = tokens[i].tag && parseInt(tokens[i].tag.substr(1, 1))
      if (tokens[i].type === 'heading_close' && options.includeLevel.indexOf(level) > -1 && tokens[i - 1].type === 'inline') {
        // init currentLevel at first round
        currentLevel = currentLevel || level

        if (level > currentLevel) {
          const [nextPos, subHeadings] = renderChildrenTokens(i, tokens)
          i = nextPos
          // nest ul into parent li
          const last = headings.pop()
          headings.push(last.slice(0, last.length - 5))
          headings.push(subHeadings + '</li>')
          continue
        } else if (level < currentLevel) {
          return [i, `<${options.listType}>${headings.join('')}</${options.listType}>`]
        }

        // get content from previous inline token
        const content = tokens[i - 1].content
        // instead of slugify the content directly, try to find id created by markdown-it-anchor first
        let link = '#' + (tokens[i - 2].attrGet('id') || options.slugify(content))
        link = typeof options.transformLink === 'function' ? options.transformLink(link) : link

        let element = `<li><a href="${link}">`
        element += typeof options.format === 'function' ? options.format(content) : content
        element += `</a></li>`
        headings.push(element)
      }
    }
    return [tokens.length, `<${options.listType}>${headings.join('')}</${options.listType}>`]
  }

  // Catch all the tokens for iteration later
  md.core.ruler.push('grab_state', state => {
    gStateTokens = state.tokens.slice(0)
  })
}
