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
      frontmatter: {},
      filePath: path.resolve(source, 'foo.md'),
      filePathRelative: 'foo.md',
      htmlFilePathRelative: 'foo.html',
      key: 'key',
    })

    expect(resolved).toEqual({
      deps: [],
      headers: [],
      links: [],
      componentFilePath: app.dir.temp('pages/foo.html.vue'),
      componentFilePathRelative: 'pages/foo.html.vue',
      componentFileContent: '<template><p>foobar</p>\n</template>',
      componentFileChunkName: 'key',
    })
  })

  it('should use html file path if the relative file path is null', async () => {
    const resolved = await resolvePageComponentInfo({
      app,
      content: 'foobar',
      frontmatter: {},
      filePath: null,
      filePathRelative: null,
      htmlFilePathRelative: 'foo.html',
      key: 'key',
    })

    expect(resolved).toEqual({
      deps: [],
      headers: [],
      links: [],
      componentFilePath: app.dir.temp('pages/foo.html.vue'),
      componentFilePathRelative: 'pages/foo.html.vue',
      componentFileContent: '<template><p>foobar</p>\n</template>',
      componentFileChunkName: 'key',
    })
  })
})
