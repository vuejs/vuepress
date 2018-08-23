const indexRE = /(^|.*\/)(index|readme)\.md$/i
const extRE = /\.(vue|md)$/

exports.fileToPath = function (file) {
  if (exports.isIndexFile(file)) {
    // README.md -> /
    // foo/README.md -> /foo/
    return file.replace(indexRE, '/$1')
  } else {
    // foo.md -> /foo.html
    // foo/bar.md -> /foo/bar.html
    return `/${file.replace(extRE, '').replace(/\\/g, '/')}.html`
  }
}

exports.isIndexFile = function (file) {
  return indexRE.test(file)
}

exports.sort = function (arr) {
  return arr.sort((a, b) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })
}
