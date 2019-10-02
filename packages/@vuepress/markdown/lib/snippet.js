const { fs, path } = require('@vuepress/shared-utils')

module.exports = function snippet (md, options = {}) {
  const fence = md.renderer.rules.fence
  const root = options.root || process.cwd()

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, , { loader }] = args
    const token = tokens[idx]
    const { src } = token
    if (src) {
      if (loader) {
        loader.addDependency(src)
      }
      if (fs.existsSync(src)) {
        token.content = fs.readFileSync(src, 'utf8')
      } else {
        token.content = 'Not found: ' + src
        token.info = ''
      }
    }
    return fence(...args)
  }

  function parser (state, startLine, endLine, silent) {
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
    const filename = rawPath.split(/{/).shift().trim()
    const meta = rawPath.replace(filename, '')

    state.line = startLine + 1

    const token = state.push('fence', 'code', 0)
    token.info = filename.split('.').pop() + meta
    token.src = path.resolve(filename)
    token.markup = '```'
    token.map = [startLine, startLine + 1]

    return true
  }

  md.block.ruler.before('fence', 'snippet', parser)
}
