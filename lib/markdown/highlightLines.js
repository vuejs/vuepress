// forked from https://github.com/egoist/markdown-it-highlight-lines

const RE = /{([\d,-]+)}/
const wrapperRE = /(^<pre .*?><code>)([^]*)(<\/code><\/pre>)/

module.exports = (md, { showLineNumbers = false } = {}) => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options] = args
    const token = tokens[idx]
    const highlightLine = RE.test(token.info)

    if (!token.info || (!highlightLine && !showLineNumbers)) {
      return fence(...args)
    }

    const langName = token.info.replace(RE, '').trim()
    const code = options.highlight
      ? options.highlight(token.content, langName)
      : token.content

    const codeMatch = code.match(wrapperRE)

    const [, leadingWrapper, rawCode, endingWrapper] = codeMatch

    let lineNumbers
    if (highlightLine) {
      lineNumbers = RE.exec(token.info)[1]
      .split(',')
      .map(v => v.split('-').map(v => parseInt(v, 10)))
    }

    let finalCode = leadingWrapper
    if (showLineNumbers) {
      finalCode = finalCode.slice(-0, -7) + ' line-number-mode><code>'
    }

    const codeSplits = rawCode.split('\n')
    const codeSplitsMaxIndex = codeSplits.length - 1

    codeSplits.forEach((split, index) => {
      if (showLineNumbers) {
        if (index === codeSplitsMaxIndex) {
          return
        }
        // Cannot apply all <span> to 'vertical-align: top' to align the line number and code.
        // Since there are some annoying text nodes at code.
        // This first space is to make 'line-wrapper' correctly display as a inline block.
        // So the line number can have a correct relative position container.
        // while the 2nd is to make 'line-wrapper' horizontal center.
        finalCode += `<span class="line-wrapper">&nbsp;<span class="line-number">&nbsp;${index + 1}</span></span>`
      }

      if (highlightLine) {
        const lineNumber = index + 1
        const inRange = lineNumbers.some(([start, end]) => {
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
