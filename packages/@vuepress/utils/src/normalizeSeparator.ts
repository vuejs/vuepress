/**
 * Normalize the path segment separator to posix-style
 *
 * @see https://github.com/micromatch/micromatch#backslashes
 */
export const normalizeSeparator = (filePath: string): string =>
  filePath.replace(/\\/g, '/')
