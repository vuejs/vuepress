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

function toUtcTime (date: string | Date): number {
  let year = 1970
  let month = 0
  let day = 1

  if (typeof date === 'string') {
    const [
      yearStr,
      monthStr,
      dayStr
    ] = date.split('-')

    year = parseInt(yearStr, 10)
    month = parseInt(monthStr, 10) - 1
    day = parseInt(dayStr, 10)
  } else if (date instanceof Date) {
    // If `date` is an instance of Date,
    // it's because it was parsed from the frontmatter
    // by js-yaml, which always assumes UTC
    return date.getTime()
  }

  return Date.UTC(year, month, day)
}

function addTzOffset (utc: number): Date {
  const utcDate = new Date(utc)

  return new Date(utc + utcDate.getTimezoneOffset() * 60 * 1000)
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

  const d = addTzOffset(toUtcTime(date))
  const year = d.getFullYear()
  const iMonth = d.getMonth() + 1
  const iDay = d.getDate()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
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
