/**
 * Remove leading slash / from a string
 */
export const removeLeadingSlash = (str: string): string =>
  str.replace(/^\//, '')
