import type { RuleBlock } from 'markdown-it/lib/parser_block'
import { path } from '@vuepress/utils'
import type { ImportCodePluginOptions } from './importCodePlugin'
import type { ImportCodeTokenMeta } from './types'

// min length of the import code syntax, i.e. '@[code]()'
const MIN_LENGTH = 9

// char codes of '@[code'
const START_CODES = [64, 91, 99, 111, 100, 101]

// regexp to match the import syntax
const SYNTAX_RE = /^@\[code(?:{(?:(\d+)?-(\d+)?)})?(?: ([^\]]+))?\]\(([^)]*)\)/

export const createImportCodeBlockRule = ({
  handleImportPath = (str) => str,
}: ImportCodePluginOptions): RuleBlock => (
  state,
  startLine,
  endLine,
  silent
): boolean => {
  // if it's indented more than 3 spaces, it should be a code block
  /* istanbul ignore if */
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false
  }

  const pos = state.bMarks[startLine] + state.tShift[startLine]
  const max = state.eMarks[startLine]

  // return false if the length is shorter than min length
  if (pos + MIN_LENGTH > max) return false

  // check if it's matched the start
  for (let i = 0; i < START_CODES.length; i += 1) {
    if (state.src.charCodeAt(pos + i) !== START_CODES[i]) {
      return false
    }
  }

  // check if it's matched the syntax
  const match = state.src.slice(pos, max).match(SYNTAX_RE)
  if (!match) return false

  // return true as we have matched the syntax
  if (silent) return true

  const [, lineStart, lineEnd, info, importPath] = match

  const meta: ImportCodeTokenMeta = {
    importPath: handleImportPath(importPath),
    lineStart: lineStart ? Number.parseInt(lineStart, 10) : 0,
    lineEnd: lineEnd ? Number.parseInt(lineEnd, 10) : undefined,
  }

  // create a import_code token
  const token = state.push('import_code', 'code', 0)

  // use user specified info, or fallback to file ext
  token.info = info ?? path.extname(meta.importPath).slice(1)
  token.markup = '```'
  token.map = [startLine, startLine + 1]
  // store token meta to be used in renderer rule
  token.meta = meta

  state.line = startLine + 1

  return true
}
