const { indexRE } = require('./isIndexFile')
const isIndexFile = require('./isIndexFile')

const extRE = /\.(vue|md)$/

module.exports = function fileToPath (file) {
  if (isIndexFile(file)) {
    // README.md -> /
    // README.vue -> /
    // foo/README.md -> /foo/
    // foo/README.vue -> /foo/
    return file.replace(indexRE, '/$1')
  } else {
    // foo.md -> /foo.html
    // foo.vue -> /foo.html
    // foo/bar.md -> /foo/bar.html
    // foo/bar.vue -> /foo/bar.html
    return `/${file.replace(extRE, '').replace(/\\/g, '/')}.html`
  }
}
