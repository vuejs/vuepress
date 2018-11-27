import isIndexFile from '../lib/isIndexFile'

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
    'one.md',
    'one-index.md',
    'foo/one-index.md'
  ].forEach(file => {
    expect(isIndexFile(file)).toBe(false)
  })
})
