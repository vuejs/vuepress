const { EventEmitter } = require('events')
const { getOptions } = require('loader-utils')
const frontmatter = require('yaml-front-matter')

const frontmatterCache = new Map()

module.exports = function (src) {
  const { markdown } = getOptions(this)
  const parsed = frontmatter.loadFront(src)
  const content = parsed.__content
  delete parsed.__content

  // diff frontmatter, since it's not going to be part of the returned
  // component, changes in frontmatter do not trigger hot updates
  const serializedData = JSON.stringify(parsed)
  const cachedData = frontmatterCache.get(this.resourcePath)
  if (cachedData != null && cachedData !== serializedData) {
    // frontmatter changed... need to do a full reload
    module.exports.frontmatterEmitter.emit('update')
  }
  frontmatterCache.set(this.resourcePath, serializedData)

  const { html, hoistedTags } = markdown.renderWithHoisting(content)
  return (
    `<template>\n` +
      `<div class="markdown">${html}</div>\n` +
    `</template>\n` +
    hoistedTags.join('\n')
  )
}

module.exports.frontmatterEmitter = new EventEmitter()
