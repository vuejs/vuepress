import { createApp, resolvePageRoutesInfo } from '@vuepress/core'
import { path } from '@vuepress/utils'

const source = path.resolve(__dirname, 'fake-source')
const app = createApp({
  source,
})

describe('core > page > resolvePageRoutesInfo', () => {
  it('should resolve page routes file path correctly', () => {
    const key = 'foobar'
    const expectedFilePath = app.dir.temp(`internal/pageRoutes/${key}.js`)
    expect(
      resolvePageRoutesInfo({
        app,
        key,
      })
    ).toEqual({
      routesFilePath: expectedFilePath,
      routesFilePathRelative: path.relative(app.dir.temp(), expectedFilePath),
    })
  })
})
