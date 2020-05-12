/**
 * Infer page path according to file path
 */
export const inferPagePath = (
  filePathRelative: string | null
): string | null => {
  if (!filePathRelative) {
    return null
  }

  // foo.md -> /foo.html
  // foo.vue -> /foo.html
  // foo/bar.md -> /foo/bar.html
  // foo/bar.vue -> /foo/bar.html
  return `/${filePathRelative.replace(/\.(vue|md)$/, '.html')}`
}
