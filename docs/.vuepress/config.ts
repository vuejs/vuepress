import type { UserConfig } from '@vuepress/core'
import type { DefaultThemeOptions } from '@vuepress/theme-default'

const config: UserConfig<DefaultThemeOptions> = {
  base: '/',

  evergreen: process.env.NODE_ENV !== 'production',

  // site-level locales config
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
    logo: '/hero.png',

    repo: 'vuepress/vuepress-next',

    docsDir: 'docs',

    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        // navbar
        navbar: [
          {
            text: 'Guide',
            link: '/guide/',
          },
          {
            text: 'Learn More',
            children: [
              '/contributing.md',
              {
                text: 'Changelog',
                link:
                  'https://github.com/vuepress/vuepress-next/blob/master/CHANGELOG.md',
              },
            ],
          },
        ],

        // sidebar
        sidebar: {
          '/guide/': [
            {
              isGroup: true,
              text: 'Guide',
              children: ['/guide/README.md', '/guide/getting-started.md'],
            },
          ],
        },

        // page meta
        editLinkText: 'Edit this page on GitHub',
      },

      /**
       * Chinese locale config
       */
      '/zh/': {
        // navbar
        navbar: [
          {
            text: '指南',
            link: '/zh/guide/',
          },
          {
            text: '了解更多',
            children: [
              '/zh/contributing.md',
              {
                text: '更新日志',
                link:
                  'https://github.com/vuepress/vuepress-next/blob/master/CHANGELOG.md',
              },
            ],
          },
        ],
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',

        // sidebar
        sidebar: {
          '/zh/guide/': [
            {
              isGroup: true,
              text: '指南',
              children: ['/zh/guide/README.md', '/zh/guide/getting-started.md'],
            },
          ],
        },

        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',

        // custom blocks
        info: '提示',
        warning: '注意',
        danger: '警告',

        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',

        // other
        openInNewWindow: '在新窗口打开',
      },
    },
  },
}

export = config
