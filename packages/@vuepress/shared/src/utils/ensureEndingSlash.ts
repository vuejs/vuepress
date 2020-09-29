/**
 * Ensure a url string to have ending slash /
 */
export const ensureEndingSlash = (str: string): string =>
  /(\.html|\/)$/.test(str) ? str : str + '/'
