const deeplyParseHeaders = require('./deeplyParseHeaders')

/**
 * Infer a page's title via frontmatter and content.
 *
 * @param {object} frontmatter
 * @param {string} strippedContent
 * @returns {*}
 */

module.exports = function (frontmatter, strippedContent) {
  if (frontmatter.home) {
    return 'Home'
  }
  if (frontmatter.title) {
    return deeplyParseHeaders(frontmatter.title)
  }
  const match = strippedContent.trim().match(/^#+\s+(.*)/)
  if (match) {
    return deeplyParseHeaders(match[1])
  }
}
