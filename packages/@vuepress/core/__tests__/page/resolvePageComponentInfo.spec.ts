import { createApp, resolvePageComponentInfo } from '@vuepress/core'
import { path } from '@vuepress/utils'

const source = path.resolve(__dirname, 'fake-source')
const app = createApp({
  source,
})

describe('core > page > resolvePageComponentInfo', () => {
  it('should resolve page component', async () => {
    const resolved = await resolvePageComponentInfo({
      app,
      content: 'foobar',
      filePathRelative: 'foo.md',
      path: '/foo.html',
      key: 'key',
    })

    expect(resolved).toEqual({
      headers: [],
      links: [],
      componentFilePath: app.dir.temp('pages/foo.vue'),
      componentFilePathRelative: 'pages/foo.vue',
      componentFileContent: '<template><p>foobar</p>\n</template>',
      componentFileChunkName: 'key',
    })
  })

  it('should add .vue extension directly if the relative file path is null', async () => {
    const resolved = await resolvePageComponentInfo({
      app,
      content: 'foobar',
      filePathRelative: null,
      path: '/foo.html',
      key: 'key',
    })

    expect(resolved).toEqual({
      headers: [],
      links: [],
      componentFilePath: app.dir.temp('pages/foo.html.vue'),
      componentFilePathRelative: 'pages/foo.html.vue',
      componentFileContent: '<template><p>foobar</p>\n</template>',
      componentFileChunkName: 'key',
    })
  })

  it('should use key if the relative file path is null and the path is empty', async () => {
    const resolved = await resolvePageComponentInfo({
      app,
      content: 'foobar',
      filePathRelative: null,
      path: '',
      key: 'key',
    })

    expect(resolved).toEqual({
      headers: [],
      links: [],
      componentFilePath: app.dir.temp('pages/key.vue'),
      componentFilePathRelative: 'pages/key.vue',
      componentFileContent: '<template><p>foobar</p>\n</template>',
      componentFileChunkName: 'key',
    })
  })
})
