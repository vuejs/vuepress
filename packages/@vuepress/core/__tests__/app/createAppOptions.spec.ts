import { createAppOptions } from '@vuepress/core'
import { path } from '@vuepress/utils'

describe('core > app > createAppOptions', () => {
  it('should create app options with default values', () => {
    expect(createAppOptions({ source: '/foo' })).toEqual({
      base: '/',
      lang: 'en-US',
      title: '',
      description: '',
      head: [],
      locales: {},
      markdown: {},
      plugins: [],
      theme: '@vuepress/default',
      themeConfig: {},
      source: '/foo',
      dest: '/foo/.vuepress/dist',
      temp: '/foo/.vuepress/.temp',
      cache: '/foo/.vuepress/.cache',
      public: '/foo/.vuepress/public',
      host: '0.0.0.0',
      port: 8080,
      debug: false,
      open: false,
      evergreen: true,
      templateDev: path.normalize(
        require.resolve('@vuepress/client/templates/index.dev.html')
      ),
      templateSSR: path.normalize(
        require.resolve('@vuepress/client/templates/index.ssr.html')
      ),
      shouldPreload: true,
      shouldPrefetch: false,
      pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'],
    })
  })
})
