import { createAppOptions } from '@vuepress/core'
import { path } from '@vuepress/utils'

describe('core > app > createAppOptions', () => {
  it('should create app options with default values', () => {
    const source = '/foo'

    expect(createAppOptions({ source })).toEqual({
      base: '/',
      lang: 'en-US',
      title: '',
      description: '',
      head: [],
      locales: {},
      theme: '@vuepress/default',
      themeConfig: {},
      bundler: '@vuepress/webpack',
      bundlerConfig: {},
      source,
      dest: path.resolve(source, '.vuepress/dist'),
      temp: path.resolve(source, '.vuepress/.temp'),
      cache: path.resolve(source, '.vuepress/.cache'),
      public: path.resolve(source, '.vuepress/public'),
      debug: false,
      host: '0.0.0.0',
      port: 8080,
      open: false,
      pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'],
      templateDev: path.normalize(
        require.resolve('@vuepress/client/templates/index.dev.html')
      ),
      templateSSR: path.normalize(
        require.resolve('@vuepress/client/templates/index.ssr.html')
      ),
      shouldPreload: true,
      shouldPrefetch: false,
      markdown: {},
    })
  })
})
