/* eslint-disable @typescript-eslint/naming-convention */

// Forked and modified from 'markdown-it/lib/common/html_re.js'

// Regexps to match html elements

// MODIFIED HERE: Support `@` as the first char of attr name
const attr_name = '[a-zA-Z_:@][a-zA-Z0-9:._-]*'

const unquoted = '[^"\'=<>`\\x00-\\x20]+'
const single_quoted = "'[^']*'"
const double_quoted = '"[^"]*"'

const attr_value =
  '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')'

const attribute = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)'

const open_tag = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>'

const close_tag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>'
const comment = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->'
const processing = '<[?][\\s\\S]*?[?]>'
const declaration = '<![A-Z]+\\s+[^>]*>'
const cdata = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>'

export const HTML_TAG_RE = new RegExp(
  '^(?:' +
    open_tag +
    '|' +
    close_tag +
    '|' +
    comment +
    '|' +
    processing +
    '|' +
    declaration +
    '|' +
    cdata +
    ')'
)

export const HTML_OPEN_CLOSE_TAG_RE = new RegExp(
  '^(?:' + open_tag + '|' + close_tag + ')'
)
