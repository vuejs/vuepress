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

    const codeSplits = rawCode.split('\n').map((split, index) => {
      if (highlightLine) {
        const lineNumber = index + 1
        const inRange = lineNumbers.some(([start, end]) => {
          if (start && end) {
            return lineNumber >= start && lineNumber <= end
          }
          return lineNumber === start
        })
        if (inRange) {
          return {
            code: `<span class="highlighted-line">${split}</span>`,
            highlighted: true
          }
        }
      }
      return {
        code: split
      }
    })

    let finalCode = leadingWrapper

    if (showLineNumbers) {
      finalCode = finalCode.slice(-0, -7) + ' line-number-mode><code>'
    }

    codeSplits.forEach((split, index) => {
      if (showLineNumbers) {
        if (index === codeSplits.length - 1) {
          return
        }
        finalCode += `<div class="line-wrapper"><span class="line-number">${index + 1}</span>`
      }
      if (split.highlighted) {
        finalCode += split.code
      } else {
        finalCode += `${split.code}\n`
      }
      if (showLineNumbers) {
        finalCode += `</div>`
      }
    })
    finalCode += endingWrapper
    return finalCode
  }
}
