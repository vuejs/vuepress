import { createApp, resolveFilePath } from '@vuepress/core'
import { path } from '@vuepress/utils'

const dirSource = path.resolve(__dirname, 'fake-source')
const app = createApp({
  dirSource,
})

describe('core > page > resolveFilePath', () => {
  it('should return null if the filePath is empty', () => {
    const resolved = resolveFilePath(app, {})
    expect(resolved).toEqual({
      filePath: null,
      filePathRelative: null,
    })
  })

  const absoluteFilePath = path.resolve(dirSource, 'file.md')
  const relativeFilePath = 'file.md'

  it('should resolve path correctly if filePath is absolute', () => {
    const resolved = resolveFilePath(app, {
      filePath: absoluteFilePath,
    })
    expect(resolved).toEqual({
      filePath: absoluteFilePath,
      filePathRelative: relativeFilePath,
    })
  })

  it('should resolve path correctly if filePath is relative', () => {
    const resolved = resolveFilePath(app, {
      filePath: relativeFilePath,
    })
    expect(resolved).toEqual({
      filePath: absoluteFilePath,
      filePathRelative: relativeFilePath,
    })
  })
})
