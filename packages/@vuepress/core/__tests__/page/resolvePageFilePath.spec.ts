import { createBaseApp, resolvePageFilePath } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/empty.js'),
})

describe('core > page > resolvePageFilePath', () => {
  it('should return null if the filePath is empty', () => {
    const resolved = resolvePageFilePath({
      app,
      options: {},
    })
    expect(resolved).toEqual({
      filePath: null,
      filePathRelative: null,
    })
  })

  const absoluteFilePath = app.dir.source('file.md')
  const relativeFilePath = 'file.md'

  it('should resolve path correctly if filePath is absolute', () => {
    const resolved = resolvePageFilePath({
      app,
      options: {
        filePath: absoluteFilePath,
      },
    })
    expect(resolved).toEqual({
      filePath: absoluteFilePath,
      filePathRelative: relativeFilePath,
    })
  })

  it('should resolve path correctly if filePath is relative', () => {
    const resolved = resolvePageFilePath({
      app,
      options: {
        filePath: relativeFilePath,
      },
    })
    expect(resolved).toEqual({
      filePath: absoluteFilePath,
      filePathRelative: relativeFilePath,
    })
  })
})
