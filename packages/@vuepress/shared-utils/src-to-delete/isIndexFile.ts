export const indexRE = /(^|.*\/)(index|readme)\.(md|vue)$/i

export function isIndexFile (file: string): boolean {
  return indexRE.test(file)
}
