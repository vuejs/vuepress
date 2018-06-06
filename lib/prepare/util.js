const path = require('path')
const fs = require('fs-extra')

const tempPath = path.resolve(__dirname, '../app/.temp')
fs.ensureDirSync(tempPath)

const tempCache = new Map()
exports.writeTemp = async function (file, content) {
  const destPath = path.join(tempPath, file)
  // cache write to avoid hitting the dist if it didn't change
  const cached = tempCache.get(file)
  if (cached !== content) {
    await fs.writeFile(destPath, content)
    tempCache.set(file, content)
  }
  return destPath
}

exports.writeEnhanceTemp = async function (destName, srcPath) {
  await exports.writeTemp(
    destName,
    fs.existsSync(srcPath)
      ? `export { default } from ${JSON.stringify(srcPath)}`
      : `export default function () {}`
  )
}

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

exports.encodePath = function (userpath) {
  return userpath.split('/').map(item => encodeURIComponent(item)).join('/')
}
