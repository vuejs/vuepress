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
      '/zh/': {
        info: '提示',
        warning: '注意',
        danger: '警告',
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
      },
    },
  },
}

export = config
