import fileToPath from '../src/fileToPath'

test('should return dirname of the path when it is index file ', () => {
  const asserts: Record<string, string> = {
    'README.md': '/',
    'README.vue': '/',
    'foo/README.md': '/foo/',
    'foo/README.vue': '/foo/'
  }
  Object.keys(asserts).forEach(file => {
    expect(fileToPath(file)).toBe(asserts[file])
  })
})

test('should return a path with .html suffix', () => {
  const asserts: Record<string, string> = {
    'foo.md': '/foo.html',
    'foo.vue': '/foo.html',
    'foo/bar.md': '/foo/bar.html',
    'foo/bar.vue': '/foo/bar.html'
  }
  Object.keys(asserts).forEach(file => {
    expect(fileToPath(file)).toBe(asserts[file])
  })
})
