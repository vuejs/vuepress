/**
 * Filter html blocks from string, but keep those inside markdown code span
 *
 * @example filterHtmlBlocks('<a> b') === 'b'
 * @example filterHtmlBlocks('`<a>` b') === '`<a>` b'
 */
export const filterHtmlBlocks = (str: string): string =>
  str.replace(/(^|[^><`])<.*>([^><`]|$)/g, '$1$2')
