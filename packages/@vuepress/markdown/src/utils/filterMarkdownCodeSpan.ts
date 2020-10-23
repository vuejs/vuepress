/**
 * Filter markdown inline code span syntax, and keep the raw code text
 *
 * @see https://spec.commonmark.org/0.29/#code-spans
 */
export const filterMarkdownCodeSpan = (str: string): string =>
  str.replace(/(?<!`)(`+)(?!`)( ?)(.+?)\2(?<!`)\1(?!`)/g, '$3')
