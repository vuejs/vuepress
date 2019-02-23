import { isIndexFile } from '../src/isIndexFile'

test('isIndexFile', () => {
  [
    'README.md',
    'readme.md',
    'INDEX.md',
    'index.md',
    'foo/README.md',
    'foo/index.md',
    'README.vue',
    'readme.vue',
    'INDEX.vue',
    'index.vue',
    'foo/README.vue',
    'foo/index.vue'
  ].forEach(file => {
    expect(isIndexFile(file)).toBe(true)
  });
  [
    'foo/one.md',
    'one.md',
    'one-index.md',
    'foo/one-index.md',
    'foo/one.vue',
    'one.vue',
    'one-index.vue',
    'foo/one-index.vue'
  ].forEach(file => {
    expect(isIndexFile(file)).toBe(false)
  })
})
