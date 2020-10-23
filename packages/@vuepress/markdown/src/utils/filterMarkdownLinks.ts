/**
 * Filter markdown link syntax, and keep the link text
 *
 * @see https://spec.commonmark.org/0.29/#links
 */
export const filterMarkdownLinks = (str: string): string =>
  str.replace(/\[(.*)\]\(.*\)/g, '$1')
