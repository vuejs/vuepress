const path = require('upath')

module.exports = function toAbsolutePath (raw, cwd = process.cwd()) {
  if (path.isAbsolute(raw)) {
    return raw
  }
  return path.resolve(cwd, raw)
}
