import {
  isIndexFile,
  fileToPath
} from '@/prepare/util.js'

describe('prepare - util', () => {
  test('isIndexFile', () => {
    [
      'README.md',
      'readme.md',
      'INDEX.md',
      'index.md',
      'foo/README.md',
      'foo/index.md'
    ].forEach(file => {
      expect(isIndexFile(file)).toBe(true)
    });
    [
      'foo/one.md',
      'one.md'
    ].forEach(file => {
      expect(isIndexFile(file)).toBe(false)
    })
  })

  test('fileToPath', () => {
    const asserts = {
      'README.md': '/',
      'foo/README.md': '/foo/',
      'foo.md': '/foo.html',
      'foo/bar.md': '/foo/bar.html'
    }
    Object.keys(asserts).forEach(file => {
      expect(fileToPath(file)).toBe(asserts[file])
    })
  })
})
