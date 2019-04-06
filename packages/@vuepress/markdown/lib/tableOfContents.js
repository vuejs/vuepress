// reference: https://github.com/Oktavilla/markdown-it-table-of-contents

const defaults = {
  includeLevel: [2, 3],
  containerClass: 'table-of-contents',
  markerPattern: /^\[\[toc\]\]/im,
  listType: 'ul',
  containerHeaderHtml: '',
  containerFooterHtml: ''
}

module.exports = (md, options) => {
  options = Object.assign({}, defaults, options)
  const tocRegexp = options.markerPattern

  function toc (state, startLine) {
    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]
    const match = tocRegexp.exec(state.src.slice(pos, max))
    if (!match) return false

    // Build content
    let token = state.push('toc_open', 'toc', 1)
    token.markup = '[[toc]]'
    token = state.push('toc_body', '', 0)
    token = state.push('toc_close', 'toc', -1)

    // Update pos so the parser can continue
    state.line = startLine + 1

    return true
  }

  md.renderer.rules.toc_open = function () {
    return vBindEscape`<TOC
      :class=${options.containerClass}
      :list-type=${options.listType}
      :include-level=${options.includeLevel}
    >`
  }

  md.renderer.rules.toc_body = function () {
    return `<template slot="header">${options.containerHeaderHtml}</template>`
      + `<template slot="footer">${options.containerFooterHtml}</template>`
  }

  md.renderer.rules.toc_close = function () {
    return `</TOC>`
  }

  // Insert TOC
  md.block.ruler.after('fence', 'toc', toc)
}

/** escape double quotes in v-bind derivatives */
function vBindEscape (strs, ...args) {
  return strs.reduce((prev, curr, index) => {
    return prev + curr + (index >= args.length
      ? ''
      : `"${JSON.stringify(args[index])
        .replace(/"/g, "'")
        .replace(/([^\\])(\\\\)*\\'/g, (_, char) => char + '\\u0022')}"`)
  }, '')
}
