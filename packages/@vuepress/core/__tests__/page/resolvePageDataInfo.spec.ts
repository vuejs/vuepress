import { createBaseApp, resolvePageDataInfo } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/empty.js'),
})

describe('core > page > resolvePageDataInfo', () => {
  it('should resolve page data file path correctly', () => {
    const key = 'foobar'
    const htmlFilePathRelative = 'foobar.html'
    const expectedFilePath = app.dir.temp(`pages/${htmlFilePathRelative}.js`)
    expect(
      resolvePageDataInfo({
        app,
        key,
        htmlFilePathRelative,
      })
    ).toEqual({
      dataFilePath: expectedFilePath,
      dataFilePathRelative: path.relative(app.dir.temp(), expectedFilePath),
      dataFileChunkName: key,
    })
  })
})
