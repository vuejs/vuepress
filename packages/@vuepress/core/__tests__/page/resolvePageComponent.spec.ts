import { createApp, resolvePageComponent } from '@vuepress/core'
import { path } from '@vuepress/utils'

const dirSource = path.resolve(__dirname, 'fake-source')
const app = createApp({
  dirSource,
})

describe('core > page > resolvePageComponent', () => {
  it('should resolve page component', async () => {
    const resolved = await resolvePageComponent(
      app,
      'foobar',
      'foo.md',
      '/foo.html'
    )

    expect(resolved).toEqual({
      headers: [],
      links: [],
      componentFilePath: app.dir.temp('pages/foo.vue'),
      componentFilePathRelative: 'pages/foo.vue',
      componentFileContent: '<template><p>foobar</p>\n</template>',
    })
  })

  it('should add .vue extension directly if the relative file path is null', async () => {
    const resolved = await resolvePageComponent(
      app,
      'foobar',
      null,
      '/foo.html'
    )

    expect(resolved).toEqual({
      headers: [],
      links: [],
      componentFilePath: app.dir.temp('pages/foo.html.vue'),
      componentFilePathRelative: 'pages/foo.html.vue',
      componentFileContent: '<template><p>foobar</p>\n</template>',
    })
  })
})
