const { indexRE } = require('./isIndexFile')
const isIndexFile = require('./isIndexFile')

const extRE = /\.(vue|md)$/

module.exports = function fileToPath (file) {
  if (isIndexFile(file)) {
    // README.md -> /
    // foo/README.md -> /foo/
    return file.replace(indexRE, '/$1')
  } else {
    // foo.md -> /foo/
    // foo/bar.md -> /foo/bar/
    return `/${file.replace(extRE, '').replace(/\\/g, '/')}/`
  }
}
