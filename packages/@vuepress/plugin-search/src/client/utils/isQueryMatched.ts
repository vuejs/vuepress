// eslint-disable-next-line no-control-regex
const nonASCIIRegExp = /[^\x00-\x7F]/

const splitWords = (str: string): string[] =>
  str
    .split(/\s+/g)
    .map((str) => str.trim())
    .filter((str) => !!str)

const escapeRegExp = (str: string): string =>
  str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

export const isQueryMatched = (query: string, toMatch: string[]): boolean => {
  const toMatchStr = toMatch.join(' ')
  const words = splitWords(query)

  if (nonASCIIRegExp.test(query)) {
    // if the query has non-ASCII chars, treat as other languages
    return words.some((word) => toMatchStr.toLowerCase().indexOf(word) > -1)
  }

  // if the query only has ASCII chars, treat as English
  const hasTrailingSpace = query.endsWith(' ')
  const searchRegex = new RegExp(
    words
      .map((word, index) => {
        if (words.length === index + 1 && !hasTrailingSpace) {
          // The last word - ok with the word being "startsWith"-like
          return `(?=.*\\b${escapeRegExp(word)})`
        }
        // Not the last word - expect the whole word exactly
        return `(?=.*\\b${escapeRegExp(word)}\\b)`
      })
      .join('') + '.+',
    'gi'
  )
  return searchRegex.test(toMatchStr)
}
