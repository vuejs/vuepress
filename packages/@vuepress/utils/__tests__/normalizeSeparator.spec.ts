import { normalizeSeparator } from '@vuepress/utils'

describe('utils > normalizeSeparator', () => {
  it('should transform windows separator to posix separator', () => {
    expect(normalizeSeparator('c:\\foo\\bar\\')).toBe('c:/foo/bar/')
  })

  it('should keep posix separator as is', () => {
    expect(normalizeSeparator('/foo/bar/')).toBe('/foo/bar/')
  })
})
