// forked from https://github.com/egoist/markdown-it-highlight-lines

const RE = /{([\d,-]+)}/
const wrapperRE = /^<pre .*?><code>/

module.exports = md => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options] = args
    const token = tokens[idx]

    const rawInfo = token.info
    if (!rawInfo || !RE.test(rawInfo)) {
      return fence(...args)
    }

    const langName = rawInfo.replace(RE, '').trim()
    // ensure the next plugin get the correct lang.
    token.info = langName

    const lineNumbers = RE.exec(rawInfo)[1]
      .split(',')
      .map(v => v.split('-').map(v => parseInt(v, 10)))

    const code = options.highlight
      ? options.highlight(token.content, langName)
      : token.content

    const rawCode = code.replace(wrapperRE, '')
    const leadingWrapper = code.match(wrapperRE)[0]

    const codeSplits = rawCode.split('\n').map((split, index) => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) => {
        if (start && end) {
          return lineNumber >= start && lineNumber <= end
        }
        return lineNumber === start
      })
      if (inRange) {
        return {
          code: `<span class="highlighted-line">${split || '\n'}</span>`,
          highlighted: true
        }
      }
      return {
        code: split
      }
    })
    let highlightedCode = leadingWrapper
    codeSplits.forEach(split => {
      if (split.highlighted) {
        highlightedCode += split.code
      } else {
        highlightedCode += `${split.code}\n`
      }
    })
    return highlightedCode
  }
}
