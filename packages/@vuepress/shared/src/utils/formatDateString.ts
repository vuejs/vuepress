/**
 * Format a date string to `yyyy-MM-dd`
 */
export const formatDateString = (
  str: string,
  defaultDateString = ''
): string => {
  // match the `yyyy-(M)M-(d)d` pattern
  const dateMatch = str.match(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/)

  // return `defaultDateString` if no matched pattern
  if (dateMatch === null) {
    return defaultDateString
  }

  // fill leading zeros for month and day
  const [, yearStr, monthStr, dayStr] = dateMatch
  return [yearStr, monthStr.padStart(2, '0'), dayStr.padStart(2, '0')].join('-')
}
