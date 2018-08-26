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

// e.g.
// filename: docs/_posts/evan you.md
// content: # yyx 990803
// date: 2018-08-14 11:22:33
// :year/:month/:day/:slug/ => 2018/08/14/evan-you/
// :year-:month-:day-:slug/ => 2018-08-14-evan-you/
// :year/:month/:day/:title/ => 2018/08/14/yyx 990803/
// :year/:month/:day/:original/ => 2018/08/14/_posts/evan you.html

exports.getPermalink = function ({
  pattern,
  slug,
  date,
  regularPath,
  localePath
}) {
  if (!pattern) {
    return
  }
  slug = encodeURI(slug)

  const d = new Date(date)
  const year = d.getFullYear()
  const iMonth = d.getMonth() + 1
  const iDay = d.getDate()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  const month = iMonth < 10 ? `0${iMonth}` : iMonth
  const day = iDay < 10 ? `0${iDay}` : iDay

  // Remove leading slash
  pattern = pattern.replace(/^\//, '')

  const link =
    localePath +
    pattern
      .replace(/:year/, year)
      .replace(/:month/, month)
      .replace(/:i_month/, iMonth)
      .replace(/:i_day/, iDay)
      .replace(/:day/, day)
      .replace(/:minutes/, minutes)
      .replace(/:seconds/, seconds)
      .replace(/:slug/, slug)
      .replace(/:regular/, regularPath)

  return ensureLeadingSlash(
    ensureEndingSlash(link)
  )
}

function ensureLeadingSlash (path) {
  return path.replace(/^\/?/, '/')
}

function ensureEndingSlash (path) {
  return /(\.html|\/)$/.test(path)
    ? path
    : path + '/'
}
