/**
 * Filter markdown emphasis syntax, and keep the text
 *
 * @see https://spec.commonmark.org/0.29/#emphasis-and-strong-emphasis
 */
export const filterMarkdownEmphasis = (str: string): string =>
  str
    // **foo** => foo
    .replace(/(\*{1,3})(?! )([^*]+(?!\\| ))\1/g, '$2')
    // __foo__ => foo
    .replace(/(_{1,3})(?! )([^_]+(?!\\| ))\1/g, '$2')
