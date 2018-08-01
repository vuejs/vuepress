const fs = require('fs')
const path = require('path')
const hash = require('hash-sum')
const { EventEmitter } = require('events')
const { getOptions } = require('loader-utils')
const { inferTitle, extractHeaders, parseFrontmatter } = require('../util')
const LRU = require('lru-cache')

const cache = LRU({ max: 1000 })
const devCache = LRU({ max: 1000 })

module.exports = function (src) {
  const isProd = process.env.NODE_ENV === 'production'
  const isServer = this.target === 'node'
  const { markdown, sourceDir } = getOptions(this)

  // we implement a manual cache here because this loader is chained before
  // vue-loader, and will be applied on the same file multiple times when
  // selecting the individual blocks.
  const file = this.resourcePath
  const key = hash(file + src)
  const cached = cache.get(key)
  if (cached && (isProd || /\?vue/.test(this.resourceQuery))) {
    return cached
  }

  const frontmatter = parseFrontmatter(src)
  const content = frontmatter.content

  if (!isProd && !isServer) {
    const inferredTitle = inferTitle(frontmatter)
    const headers = extractHeaders(content, ['h2', 'h3'], markdown)
    delete frontmatter.content

    // diff frontmatter and title, since they are not going to be part of the
    // returned component, changes in frontmatter do not trigger proper updates
    const cachedData = devCache.get(file)
    if (cachedData && (
      cachedData.inferredTitle !== inferredTitle ||
      JSON.stringify(cachedData.frontmatter) !== JSON.stringify(frontmatter) ||
      headersChanged(cachedData.headers, headers)
    )) {
      // frontmatter changed... need to do a full reload
      module.exports.frontmatterEmitter.emit('update')
    }

    devCache.set(file, {
      headers,
      frontmatter,
      inferredTitle
    })
  }

  // the render method has been augmented to allow plugins to
  // register data during render
  const { html, data: { hoistedTags, links }} = markdown.render(content)

  // check if relative links are valid
  links && links.forEach(link => {
    link = decodeURIComponent(link)
    const shortname = link
      .replace(/#.*$/, '')
      .replace(/\.html$/, '.md')
    const filename = shortname
      .replace(/\/$/, '/README.md')
      .replace(/^\//, sourceDir + '/')
    const altname = shortname
      .replace(/\/$/, '/index.md')
      .replace(/^\//, sourceDir + '/')
    const dir = path.dirname(this.resourcePath)
    const file = path.resolve(dir, filename)
    const altfile = altname !== filename ? path.resolve(dir, altname) : null
    if (!fs.existsSync(file) && (!altfile || !fs.existsSync(altfile))) {
      this.emitWarning(
        new Error(
          `\nFile for relative link "${link}" does not exist.\n` +
          `(Resolved file: ${file})\n`
        )
      )
    }
  })

  const res = (
    `<template>\n` +
      `<div class="content">${html}</div>\n` +
    `</template>\n` +
    (hoistedTags || []).join('\n')
  )
  cache.set(key, res)
  return res
}

function headersChanged (a, b) {
  if (a.length !== b.length) return true
  return a.some((h, i) => (
    h.title !== b[i].title ||
    h.level !== b[i].level
  ))
}

module.exports.frontmatterEmitter = new EventEmitter()
