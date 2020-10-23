/**
 * Filter markdown backslash escapes syntax, keep the escaped char
 *
 * @see https://spec.commonmark.org/0.29/#backslash-escapes
 */
export const filterMarkdownEscapes = (str: string): string =>
  str.replace(
    /(\\)(!|"|#|\$|%|&|'|\(|\)|\*|\+|,|-|\.|\/|:|;|<|=|>|\?|@|\[|\\|\]|\^|_|`|\{|\||\}|~)/g,
    '$2'
  )
