const path = require('path')
const spawn = require('cross-spawn')
const fs = require('fs-extra')
const globby = require('globby')

const tempPath = path.resolve(__dirname, '../app/.temp')
fs.ensureDirSync(tempPath)

const tempCache = new Map()
async function writeTemp (file, content) {
  // cache write to avoid hitting the dist if it didn't change
  const cached = tempCache.get(file)
  if (cached !== content) {
    await fs.writeFile(path.join(tempPath, file), content)
    tempCache.set(file, content)
  }
}

async function writeEnhanceTemp (destName, srcPath) {
  await writeTemp(
    destName,
    fs.existsSync(srcPath)
      ? `export { default } from ${JSON.stringify(srcPath)}`
      : `export default function () {}`
  )
}

const indexRE = /(^|.*\/)(index|readme)\.md$/i
const extRE = /\.(vue|md)$/

function fileToPath (file) {
  if (isIndexFile(file)) {
    // README.md -> /
    // foo/README.md -> /foo/
    return file.replace(indexRE, '/$1')
  } else {
    // foo.md -> /foo.html
    // foo/bar.md -> /foo/bar.html
    return `/${file.replace(extRE, '').replace(/\\/g, '/')}.html`
  }
}

function fileToComponentName (file) {
  let normalizedName = file
  .replace(/\/|\\/g, '-')
  .replace(extRE, '')
  if (isIndexFile(file)) {
    normalizedName = normalizedName.replace(/readme$/i, 'index')
  }
  const pagePrefix = /\.md$/.test(file) ? `page-` : ``
  return `${pagePrefix}${normalizedName}`
}

function isIndexFile (file) {
  return indexRE.test(file)
}

async function resolveComponents (sourceDir) {
  const componentDir = path.resolve(sourceDir, '.vuepress/components')
  if (!fs.existsSync(componentDir)) {
    return
  }
  return sort(await globby(['**/*.vue'], { cwd: componentDir }))
}

function sort (arr) {
  return arr.sort((a, b) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })
}

function encodePath (userpath) {
  return userpath.split('/').map(item => encodeURIComponent(item)).join('/')
}

function getGitLastUpdatedTimeStamp (filepath) {
  return parseInt(spawn.sync('git', ['log', '-1', '--format=%ct', filepath]).stdout.toString('utf-8')) * 1000
}

module.exports = {
  encodePath,
  fileToPath,
  fileToComponentName,
  resolveComponents,
  sort,
  writeTemp,
  writeEnhanceTemp,
  getGitLastUpdatedTimeStamp
}
