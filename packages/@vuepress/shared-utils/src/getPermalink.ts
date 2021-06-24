import dayjs from 'dayjs'
import ensureEndingSlash from './ensureEndingSlash'
import ensureLeadingSlash from './ensureLeadingSlash'

interface PermalinkOption {
  pattern: string;
  slug: string;
  date: string;
  regularPath: string;
  localePath: string;
}

function removeLeadingSlash (path: string) {
  return path.replace(/^\//, '')
}

// e.g.
// filename: docs/_posts/evan you.md
// content: # yyx 990803
// date: 2018-08-14 11:22:33
// :year/:month/:day/:slug/ => 2018/08/14/evan-you/
// :year-:month-:day-:slug/ => 2018-08-14-evan-you/
// :year/:month/:day/:title/ => 2018/08/14/yyx 990803/
// :year/:month/:day/:original/ => 2018/08/14/_posts/evan you.html

export = function getPermalink ({
  pattern,
  slug,
  date,
  regularPath,
  localePath = '/'
}: PermalinkOption) {
  if (!pattern) {
    return
  }
  slug = encodeURI(slug)

  const d = dayjs(date)
  const year = d.year()
  const iMonth = d.month() + 1
  const iDay = d.date()
  const minutes = d.minute()
  const seconds = d.second()
  const month = iMonth < 10 ? `0${iMonth}` : iMonth
  const day = iDay < 10 ? `0${iDay}` : iDay

  pattern = removeLeadingSlash(pattern)

  const link
    = localePath
    + pattern
      .replace(/:year/, String(year))
      .replace(/:month/, String(month))
      .replace(/:i_month/, String(iMonth))
      .replace(/:i_day/, String(iDay))
      .replace(/:day/, String(day))
      .replace(/:minutes/, String(minutes))
      .replace(/:seconds/, String(seconds))
      .replace(/:slug/, slug)
      .replace(/:regular/, removeLeadingSlash(regularPath))

  return ensureLeadingSlash(ensureEndingSlash(link))
}
