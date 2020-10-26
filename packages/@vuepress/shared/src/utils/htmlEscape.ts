const htmlEscapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}

const htmlEscapeRegexp = /[&<>'"]/g

/**
 * Escape html chars
 */
export const htmlEscape = (str: string): string =>
  str.replace(htmlEscapeRegexp, (char) => htmlEscapeMap[char])
