const { EventEmitter } = require('events')
const { getOptions } = require('loader-utils')
const yaml = require('yaml-front-matter')
const { inferTitle } = require('../util')

const cache = new Map()

module.exports = function (src) {
  const { markdown } = getOptions(this)

  const frontmatter = yaml.loadFront(src)
  const inferredTitle = inferTitle(frontmatter)
  const content = frontmatter.__content
  delete frontmatter.__content

  // diff frontmatter and title, since they are not going to be part of the
  // returned component, changes in frontmatter do not trigger proper updates
  const cachedData = cache.get(this.resourcePath)
  if (cachedData && (
    cachedData.inferredTitle !== inferredTitle ||
    JSON.stringify(cachedData.frontmatter) !== JSON.stringify(frontmatter)
  )) {
    // frontmatter changed... need to do a full reload
    module.exports.frontmatterEmitter.emit('update')
  }

  cache.set(this.resourcePath, {
    frontmatter,
    inferredTitle
  })

  const { html, hoistedTags } = markdown.renderWithHoisting(content)
  return (
    `<template>\n` +
      `<div class="markdown">${html}</div>\n` +
    `</template>\n` +
    hoistedTags.join('\n')
  )
}

module.exports.frontmatterEmitter = new EventEmitter()
