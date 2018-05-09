// Modified from https://github.com/egoist/markdown-it-highlight-lines

const RE = /{([\d,-]+)}/
const wrapperRE = /(^<pre .*?><code>)([^]*)(<\/code><\/pre>)/

module.exports = (md, { lineNumbers = false } = {}) => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options] = args
    const token = tokens[idx]
    const highlightLine = RE.test(token.info)

    if (!token.info || (!highlightLine && !lineNumbers)) {
      return fence(...args)
    }

    const langName = token.info.replace(RE, '').trim()
    const code = options.highlight
      ? options.highlight(token.content, langName)
      : token.content

    const codeMatch = code.match(wrapperRE)

    const [, leadingWrapper, rawCode, endingWrapper] = codeMatch

    let highlightedLineNumbers
    if (highlightLine) {
      highlightedLineNumbers = RE.exec(token.info)[1]
      .split(',')
      .map(v => v.split('-').map(v => parseInt(v, 10)))
    }

    let finalCode = leadingWrapper
    if (lineNumbers) {
      finalCode = finalCode.slice(-0, -7) + ' line-number-mode><code>'
    }

    const codeSplits = rawCode.split('\n')
    const codeSplitsMaxIndex = codeSplits.length - 1

    codeSplits.forEach((split, index) => {
      if (lineNumbers) {
        if (index === codeSplitsMaxIndex) {
          return
        }
        // Cannot apply all '<span>' to 'vertical-align: top' to make the line number(block)
        // and code(inline) vertical align, because there are some annoying text nodes at code.
        // The first space is to make 'line-wrapper' correctly display as a inline block, so
        // the line number can have a correct relative position container, while the 2nd space
        // is to make 'line-wrapper' horizontal center.
        finalCode += `<span class="line-wrapper">&nbsp;<span class="line-number">&nbsp;${index + 1}</span></span>`
      }

      if (highlightLine) {
        const lineNumber = index + 1
        const inRange = highlightedLineNumbers.some(([start, end]) => {
          if (start && end) {
            return lineNumber >= start && lineNumber <= end
          }
          return lineNumber === start
        })
        if (inRange) {
          finalCode += `<span class="highlighted-line">${split || '\n'}</span>`
          return
        }
      }
      finalCode += index === codeSplitsMaxIndex ? split : `${split}\n`
    })

    finalCode += endingWrapper
    return finalCode
  }
}
