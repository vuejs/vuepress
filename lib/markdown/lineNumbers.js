// markdown-it plugin for generating line numbers.
// It depends on preWrapper plugin.

module.exports = md => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)
    const code = rawCode.slice(
      rawCode.indexOf('<code>'),
      rawCode.indexOf('</code>')
    )

    const lines = code.split('\n')
    const lineNumbersCode = [...Array(lines.length - 1)]
      .map((line, index) => `<span class="line-number">${index + 1}</span><br>`).join('')

    const lineNumbersWrapperCode =
      `<div class="line-numbers-wrapper">${lineNumbersCode}</div>`

    const finalCode = rawCode
      .replace('<!--beforeend-->', `${lineNumbersWrapperCode}<!--beforeend-->`)
      .replace('extra-class', 'line-numbers-mode')

    return finalCode
  }
}
