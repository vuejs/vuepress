exports.normalizeHeadTag = tag => {
  if (typeof tag === 'string') {
    tag = [tag]
  }
  const tagName = tag[0]
  return {
    tagName,
    attributes: tag[1] || {},
    innerHTML: tag[2] || '',
    closeTag: !(tagName === 'meta' || tagName === 'link')
  }
}
