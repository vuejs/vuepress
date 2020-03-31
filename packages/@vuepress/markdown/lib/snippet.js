const { fs, logger, path } = require('@vuepress/shared-utils')

function dedent (text) {
  const wRegexp = /^([ \t]*)(.*)\n/gm
  let match; let minIndentLength = null

  while ((match = wRegexp.exec(text)) !== null) {
    const [indentation, content] = match.slice(1)
    if (!content) continue

    const indentLength = indentation.length
    if (indentLength > 0) {
      minIndentLength
        = minIndentLength !== null
          ? Math.min(minIndentLength, indentLength)
          : indentLength
    } else break
  }

  if (minIndentLength) {
    text = text.replace(
      new RegExp(`^[ \t]{${minIndentLength}}(.*)`, 'gm'),
      '$1'
    )
  }

  return text
}

function testLine (line, regexp, regionName, end = false) {
  const [full, tag, name] = regexp.exec(line.trim()) || []

  return (
    full
    && tag
    && name === regionName
    && tag.match(end ? /^[Ee]nd ?[rR]egion$/ : /^[rR]egion$/)
  )
}

function findRegion (lines, regionName) {
  const regionRegexps = [
    /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/, // javascript, typescript, java
    /^\/\* ?#((?:end)?region) ([\w*-]+) ?\*\/$/, // css, less, scss
    /^#pragma ((?:end)?region) ([\w*-]+)$/, // C, C++
    /^<!-- #?((?:end)?region) ([\w*-]+) -->$/, // HTML, markdown
    /^#((?:End )Region) ([\w*-]+)$/, // Visual Basic
    /^::#((?:end)region) ([\w*-]+)$/, // Bat
    /^# ?((?:end)?region) ([\w*-]+)$/ // C#, PHP, Powershell, Python, perl & misc
  ]

  let regexp = null
  let start = -1

  for (const [lineId, line] of lines.entries()) {
    if (regexp === null) {
      for (const reg of regionRegexps) {
        if (testLine(line, reg, regionName)) {
          start = lineId + 1
          regexp = reg
          break
        }
      }
    } else if (testLine(line, regexp, regionName, true)) {
      return { start, end: lineId, regexp }
    }
  }

  return null
}

module.exports = function snippet (md, options = {}) {
  const fence = md.renderer.rules.fence
  const root = options.root || process.cwd()

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, , { loader }] = args
    const token = tokens[idx]
    const [src, regionName] = token.src ? token.src.split('#') : ['']
    if (src) {
      if (loader) {
        loader.addDependency(src)
      }
      const isAFile = fs.lstatSync(src).isFile()
      if (fs.existsSync(src) && isAFile) {
        let content = fs.readFileSync(src, 'utf8')

        if (regionName) {
          const lines = content.split(/\r?\n/)
          const region = findRegion(lines, regionName)

          if (region) {
            content = dedent(
              lines
                .slice(region.start, region.end)
                .filter(line => !region.regexp.test(line.trim()))
                .join('\n')
            )
          }
        }

        token.content = content
      } else {
        token.content = isAFile ? `Code snippet path not found: ${src}` : `Invalid code snippet option`
        token.info = ''
        logger.error(token.content)
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

    /**
     * raw path format: "/path/to/file.extension#region {meta}"
     *    where #region and {meta} are optionnal
     *
     * captures: ['/path/to/file.extension', 'extension', '#region', '{meta}']
     */
    const rawPathRegexp = /^(.+(?:\.([a-z]+)))(?:(#[\w-]+))?(?: ?({\d+(?:[,-]\d+)?}))?$/

    const rawPath = state.src.slice(start, end).trim().replace(/^@/, root).trim()
    const [filename = '', extension = '', region = '', meta = ''] = (rawPathRegexp.exec(rawPath) || []).slice(1)

    state.line = startLine + 1

    const token = state.push('fence', 'code', 0)
    token.info = extension + meta
    token.src = path.resolve(filename) + region
    token.markup = '```'
    token.map = [startLine, startLine + 1]

    return true
  }

  md.block.ruler.before('fence', 'snippet', parser)
}
