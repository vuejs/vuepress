const { indexRE } = require('./isIndexFile')
const isIndexFile = require('./isIndexFile')

const extRE = /\.(vue|md)$/

module.exports = function fileToPath (file, htmlSuffix) {
  if (isIndexFile(file)) {
    // README.md -> /
    // foo/README.md -> /foo/
    return file.replace(indexRE, '/$1')
  } else if (htmlSuffix) {
    // foo.md -> /foo.html
    // foo/bar.md -> /foo/bar.html
    return `/${file.replace(extRE, '').replace(/\\/g, '/')}.html`
  } else {
    // foo.md -> /foo/
    // foo/bar.md -> /foo/bar/
    return `/${file.replace(extRE, '').replace(/\\/g, '/')}/`
  }
}
