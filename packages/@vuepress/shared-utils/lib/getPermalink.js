const ensureEndingSlash = require('./ensureEndingSlash')
const ensureLeadingSlash = require('./ensureLeadingSlash')

// e.g.
// filename: docs/_posts/evan you.md
// content: # yyx 990803
// date: 2018-08-14 11:22:33
// :year/:month/:day/:slug/ => 2018/08/14/evan-you/
// :year-:month-:day-:slug/ => 2018-08-14-evan-you/
// :year/:month/:day/:title/ => 2018/08/14/yyx 990803/
// :year/:month/:day/:original/ => 2018/08/14/_posts/evan you.html

module.exports = function getPermalink ({
  pattern,
  slug,
  date,
  regularPath,
  localePath = '/'
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

  return ensureLeadingSlash(ensureEndingSlash(link))
}
