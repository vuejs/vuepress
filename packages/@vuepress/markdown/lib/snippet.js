const { fs } = require('@vuepress/shared-utils')

module.exports = function snippet (md, options = {}) {
  const root = options.root || process.cwd()

  function parser (state, startLine, endLine, silent) {
    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]

    // if it's indented more than 3 spaces,
    // it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false
    }

    if (!/^<<</.test(state.src)) {
      return false
    }

    if (silent) {
      return true
    }

    const start = pos + 3
    const end = state.skipSpacesBack(max, pos)
    const rawPath = state.src.slice(start, end).trim().replace(/^@/, root)
    const filename = rawPath.split(/[{\s]/).shift()
    const content = fs.existsSync(filename) ? fs.readFileSync(filename).toString() : 'Not found: ' + filename
    const meta = rawPath.replace(filename, '')

    const langExtWithMeta = () => {
      if (meta && /lang/.test(meta)) {
        const langSet = meta.match(/lang=\w+/)[0]
        if (langSet) {
          const lang = langSet.split('=')[1]
          const extractedMeta = meta.replace(langSet, '')

          return lang + extractedMeta
        }
      }

      return filename.split('.').pop() + meta
    }

    state.line = startLine + 1

    const token = state.push('fence', 'code', 0)
    token.info = langExtWithMeta()
    token.content = content
    token.markup = '```'
    token.map = [startLine, startLine + 1]

    return true
  }

  md.block.ruler.before('fence', 'snippet', parser)
}
