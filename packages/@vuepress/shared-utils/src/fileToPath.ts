import { indexRE, isIndexFile } from './isIndexFile'

const extRE = /\.(vue|md)$/

export = function fileToPath (file: string): string {
  if (isIndexFile(file)) {
    // README.md -> /
    // README.vue -> /
    // foo/README.md -> /foo/
    // foo/README.vue -> /foo/
    return file.replace(indexRE, '/$1')
  } else {
    // foo.md -> /foo.html
    // foo.vue -> /foo.html
    // foo/bar.md -> /foo/bar.html
    // foo/bar.vue -> /foo/bar.html
    return `/${file.replace(extRE, '').replace(/\\/g, '/')}.html`
  }
}
