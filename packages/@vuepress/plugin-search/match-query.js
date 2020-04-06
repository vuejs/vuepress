
import get from 'lodash/get'

export default (query, page, additionalStr = null) => {
  let domain = get(page, 'title', '')

  if (get(page, 'frontmatter.tags')) {
    domain += ` ${page.frontmatter.tags.join(' ')}`
  }

  if (additionalStr) {
    domain += ` ${additionalStr}`
  }

  return matchTest(query, domain)
}

const matchTest = (query, domain) => {
  const escapeRegExp = str => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

  // eslint-disable-next-line no-control-regex
  const nonASCIIRegExp = new RegExp('[^\x00-\x7F]')

  const words = query
    .split(/\s+/g)
    .map(str => str.trim())
    .filter(str => !!str)

  if (!nonASCIIRegExp.test(query)) {
    // if the query only has ASCII chars, treat as English
    const hasTrailingSpace = query.endsWith(' ')
    const searchRegex = new RegExp(
      words
      .map((word, index) => {
        if (words.length === index + 1 && !hasTrailingSpace) {
          // The last word - ok with the word being "startswith"-like
          return `(?=.*\\b${escapeRegExp(word)})`
        } else {
          // Not the last word - expect the whole word exactly
          return `(?=.*\\b${escapeRegExp(word)}\\b)`
        }
      })
      .join('') + '.+',
      'gi'
    )
    return searchRegex.test(domain)
  } else {
    // if the query has non-ASCII chars, treat as other languages
    return words.some(word => domain.toLowerCase().indexOf(word) > -1)
  }
}
