const fs = require('fs')

module.exports = function codeFrame(md, options = {}) {
  const root = options.root || process.cwd()
  function parser(state, startLine, endLine, silent) {
    const CH = '<'.charCodeAt(0)
    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false
    }

    for (let i = 0; i < 3; ++i) {
      const ch = state.src.charCodeAt(pos + i)
      if (ch !== CH || pos + i >= max) return false
    }

    if (silent) {
      return true
    }

    const start = pos + 3
    const end = state.skipSpacesBack(max, pos)
    const rawPath = state.src.slice(start, end).trim().replace(/^@/, root)
    const filename = rawPath.split(/[{:\s]/).shift()
    const content = fs.existsSync(filename) ? fs.readFileSync(filename).toString() : 'Not found: ' + filename
    const meta = rawPath.replace(filename, '')

    state.line = startLine + 1;

    token = state.push('fence', 'code', 0)
    token.info = filename.split('.').pop() + meta
    token.content = content
    token.markup = '```'
    token.map = [startLine, startLine + 1]

    return true
  }

  md.block.ruler.before('fence', 'code-frame', parser)
}
