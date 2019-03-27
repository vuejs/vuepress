'use strict'

/**
 * Module dependencies.
 */

const { EventEmitter } = require('events')
const { getOptions } = require('loader-utils')
const { fs, path, parseFrontmatter, inferTitle, extractHeaders } = require('@vuepress/shared-utils')
const LRU = require('lru-cache')
const md = require('@vuepress/markdown')

const devCache = new LRU({ max: 1000 })

/**
 * Expose markdown loader.
 */

module.exports = function (src) {
  const isProd = process.env.NODE_ENV === 'production'
  const isServer = this.target === 'node'
  const options = getOptions(this)
  const loader = Object.create(this)
  const { sourceDir } = options
  let { markdown } = options
  if (!markdown) {
    markdown = md()
  }

  // we implement a manual cache here because this loader is chained before
  // vue-loader, and will be applied on the same file multiple times when
  // selecting the individual blocks.
  const file = this.resourcePath
  const { content, data } = parseFrontmatter(src)

  if (!isProd && !isServer) {
    const inferredTitle = inferTitle(data, content)
    const headers = extractHeaders(content, ['h2', 'h3'], markdown)

    // diff frontmatter and title, since they are not going to be part of the
    // returned component, changes in frontmatter do not trigger proper updates
    const cachedData = devCache.get(file)
    if (cachedData && (
      cachedData.inferredTitle !== inferredTitle
      || JSON.stringify(cachedData.frontmatterData) !== JSON.stringify(data)
      || headersChanged(cachedData.headers, headers)
    )) {
      // frontmatter changed... need to do a full reload
      module.exports.frontmatterEmitter.emit('update', file)
    }

    devCache.set(file, {
      headers,
      frontmatterData: data,
      inferredTitle
    })
  }

  // the render method has been augmented to allow plugins to
  // register data during render
  const {
    html,
    data: { hoistedTags, links },
    dataBlockString
  } = markdown.render(content, {
    loader,
    frontmatter: data,
    relativePath: path.relative(sourceDir, file).replace(/\\/g, '/')
  })

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
          `\nFile for relative link "${link}" does not exist.\n`
          + `(Resolved file: ${file})\n`
        )
      )
    }
  })

  const res = (
    `<template>\n`
      + `<ContentSlotsDistributor :slot-key="$parent.slotKey">${html}</ContentSlotsDistributor>\n`
    + `</template>\n`
    + (hoistedTags || []).join('\n')
    + `\n${dataBlockString}\n`
  )
  return res
}

function headersChanged (a, b) {
  if (a.length !== b.length) return true
  return a.some((h, i) => (
    h.title !== b[i].title
    || h.level !== b[i].level
  ))
}

module.exports.frontmatterEmitter = new EventEmitter()
