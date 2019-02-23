const { fs } = require('@vuepress/shared-utils')

const TRANSCLUDE_WITH = 'TRANSCLUDE_WITH'
const TRANSCLUDE_LINE = 'TRANSCLUDE_LINE'
const TRANSCLUDE_TAG = 'TRANSCLUDE_TAG'

module.exports = function (md, options) {
  const _root = options && options.root ? options.root : process.cwd()

  const fileExists = f => {
    return fs.existsSync(f)
  }

  const readFileSync = f => {
    return fileExists(f) ? fs.readFileSync(f).toString() : `Not Found: ${f}`
  }

  const parseOptions = opts => {
    const _t = {}
    opts.trim().split(' ').forEach(pair => {
      const [opt, value] = pair.split('=')
      _t[opt] = value
    })
    return _t
  }

  const dataFactory = (state, pos, max) => {
    const start = pos + 6
    const end = state.skipSpacesBack(max, pos) - 1
    const [opts, fullpathWithAtSym] = state.src.slice(start, end).trim().split('](')
    const fullpath = fullpathWithAtSym.replace(/^@/, _root).trim()
    const pathParts = fullpath.split('/')
    const fileParts = pathParts[pathParts.length - 1].split('.')

    return {
      file: {
        resolve: fullpath,
        path: pathParts.slice(0, pathParts.length - 1).join('/'),
        name: fileParts.slice(0, fileParts.length - 1).join('.'),
        ext: fileParts[fileParts.length - 1]
      },
      options: parseOptions(opts),
      content: readFileSync(fullpath),
      fileExists: fileExists(fullpath)
    }
  }

  const optionsMap = ({
    options
  }) => ({
    hasHighlight: options.highlight || false,
    hasTransclusion: options.transclude || options.transcludeWith || options.transcludeTag || false,
    get transclusionType () {
      if (options.transcludeWith) return TRANSCLUDE_WITH
      if (options.transcludeTag) return TRANSCLUDE_TAG
      if (options.transclude) return TRANSCLUDE_LINE
    },
    get meta () {
      return this.hasHighlight ? options.highlight : ''
    }
  })

  const contentTransclusion = ({
    content,
    options
  }, transcludeType) => {
    const lines = content.split('\n')
    let _content = ''

    if (transcludeType === TRANSCLUDE_LINE) {
      const [tStart, tEnd] = options.transclude.replace(/[^\d|-]/g, '').split('-')

      lines.forEach((line, idx) => {
        const i = idx + 1
        if (i >= tStart && i <= tEnd) {
          _content += line + '\n'
        }
      })
    } else if (transcludeType === TRANSCLUDE_TAG) {
      const t = options.transcludeTag
      const tag = new RegExp(`${t}>$|^<${t}`)
      let matched = false

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if (matched && tag.test(line)) {
          _content += line + '\n'
          break
        } else if (matched) {
          _content += line + '\n'
        } else if (tag.test(line)) {
          _content += line + '\n'
          matched = true
        }
      }
    } else if (transcludeType === TRANSCLUDE_WITH) {
      const t = options.transcludeWith
      const tag = new RegExp(t)
      let matched = false

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if (tag.test(line)) {
          matched = !matched
          continue
        }

        if (matched) {
          _content += line + '\n'
        }
      }
    }

    return _content === '' ? 'No lines matched.' : _content
  }

  function parser (state, startLine, endLine, silent) {
    const matcher = [64, 91, 99, 111, 100, 101]
    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]

    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false
    }

    for (let i = 0; i < 6; ++i) {
      const ch = state.src.charCodeAt(pos + i)
      if (ch !== matcher[i] || pos + i >= max) return false
    }

    if (silent) return true

    // handle code snippet include
    const d = dataFactory(state, pos, max)
    const opts = optionsMap(d)

    const token = state.push('fence', 'code', 0)
    token.info = (d.options.lang || d.file.ext) + opts.meta
    token.content = d.fileExists && opts.hasTransclusion ? contentTransclusion(d, opts.transclusionType) : d.content
    token.markup = '```'
    token.map = [startLine, startLine + 1]

    state.line = startLine + 1
    return true
  }

  md.block.ruler.before('fence', 'snippet', parser)
}
