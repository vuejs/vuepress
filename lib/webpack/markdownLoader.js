const { EventEmitter } = require('events')
const { getOptions } = require('loader-utils')
const yaml = require('yaml-front-matter')
const { inferTitle, extractHeaders } = require('../util')

const cache = new Map()

module.exports = function (src) {
  const isProd = process.env.NODE_ENV === 'production'
  const isServer = this.target === 'node'
  const { markdown } = getOptions(this)

  const frontmatter = yaml.loadFront(src)
  const content = frontmatter.__content

  if (!isProd && !isServer) {
    const inferredTitle = inferTitle(frontmatter)
    const headers = extractHeaders(content, ['h2', 'h3'])
    delete frontmatter.__content

    // diff frontmatter and title, since they are not going to be part of the
    // returned component, changes in frontmatter do not trigger proper updates
    const cachedData = cache.get(this.resourcePath)
    if (cachedData && (
      cachedData.inferredTitle !== inferredTitle ||
      JSON.stringify(cachedData.frontmatter) !== JSON.stringify(frontmatter) ||
      headersChanged(cachedData.headers, headers)
    )) {
      // frontmatter changed... need to do a full reload
      module.exports.frontmatterEmitter.emit('update')
    }

    cache.set(this.resourcePath, {
      headers,
      frontmatter,
      inferredTitle
    })
  }

  const { html, hoistedTags } = markdown.renderWithHoisting(content)
  return (
    `<template>\n` +
      `<div class="content">${html}</div>\n` +
    `</template>\n` +
    hoistedTags.join('\n')
  )
}

function headersChanged (a, b) {
  if (a.length !== b.length) return true
  return a.some((h, i) => (
    h.title !== b[i].title ||
    h.level !== b[i].level
  ))
}

module.exports.frontmatterEmitter = new EventEmitter()
