import fileToPath from '../src/fileToPath'

test('fileToPath', () => {
  const asserts: Record<string, string> = {
    'README.md': '/',
    'foo/README.md': '/foo/',
    'foo.md': '/foo.html',
    'foo/bar.md': '/foo/bar.html'
  }
  Object.keys(asserts).forEach(file => {
    expect(fileToPath(file)).toBe(asserts[file])
  })
})

