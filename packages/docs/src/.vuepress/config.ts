import type { UserConfig } from '@vuepress/core'
import type { DefaultThemeOptions } from '@vuepress/theme-default'

const config: UserConfig<DefaultThemeOptions> = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器',
    },
  },

  themeConfig: {
    locales: {
      '/': {},
      '/zh/': {},
    },
  },
}

export = config
