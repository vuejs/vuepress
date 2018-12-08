import deeplyParseHeaders from './deeplyParseHeaders'

/**
 * Infer a page's title via frontmatter and content.
 *
 * @param {object} frontmatter
 * @param {string} strippedContent
 * @returns {*}
 */

export = function (frontmatter: Record<string, any>, strippedContent: string): string | void {
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
