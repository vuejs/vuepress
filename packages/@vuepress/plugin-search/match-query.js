
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

  const words = query
    .split(/\s+/g)
    .map(str => str.trim())
    .filter(str => !!str)
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
}

