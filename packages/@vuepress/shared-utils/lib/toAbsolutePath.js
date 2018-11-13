'use strict'

/**
 * Module dependencies.
 */

const path = require('upath')

/**
 * Normalize path request to absolute path.
 */

module.exports = function toAbsolutePath (raw, cwd = process.cwd()) {
  if (path.isAbsolute(raw)) {
    return raw
  }
  return path.resolve(cwd, raw)
}
