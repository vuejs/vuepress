/**
 * Ensure a url string to have leading slash /
 */
export const ensureLeadingSlash = (str: string): string =>
  str.replace(/^\/?/, '/')
