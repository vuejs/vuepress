'use strict'

/**
 * Normalize head tag config.
 *
 * @param {string|array} tag
 * @returns {object}
 */

exports.normalizeHeadTag = function (tag) {
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

/**
 * Use webpack-merge to merge user's config into default config.
 *
 * @param {object} userConfig
 * @param {object} config
 * @param {boolean} isServer
 * @returns {object}
 */

exports.applyUserWebpackConfig = function (userConfig, config, isServer) {
  const merge = require('webpack-merge')
  if (typeof userConfig === 'object') {
    return merge(config, userConfig)
  }
  if (typeof userConfig === 'function') {
    const res = userConfig(config, isServer)
    if (res && typeof res === 'object') {
      return merge(config, res)
    }
  }
  return config
}

/**
 * Infer date.
 *
 * @param {object} frontmatter
 * @param {string} filename
 * @returns {null|string}
 */

const DATE_RE = /(\d{4}-\d{1,2}(-\d{1,2})?)-(.*)/
exports.DATE_RE = DATE_RE

exports.inferDate = function (frontmatter = {}, filename, dirname) {
  let matches

  if (frontmatter.date) {
    return frontmatter.date
  } else if (filename && (matches = filename.match(DATE_RE))) {
    return matches[1]
  } else if (dirname && (matches = dirname.match(DATE_RE))) {
    return matches[1]
  } else {
    return null
  }
}
