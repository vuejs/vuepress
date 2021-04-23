import type { NavbarConfig } from '@vuepress/theme-default'

export const zh: NavbarConfig = [
  {
    text: '指南',
    link: '/zh/guide/',
  },
  {
    text: '深入',
    children: [
      '/zh/advanced/architecture.md',
      '/zh/advanced/plugin.md',
      '/zh/advanced/theme.md',
      {
        text: 'Cookbook',
        link: '/zh/advanced/cookbook/',
      },
    ],
  },
  {
    text: '参考',
    children: [
      {
        text: 'VuePress',
        children: [
          '/zh/reference/cli.md',
          '/zh/reference/config.md',
          '/zh/reference/frontmatter.md',
          '/zh/reference/components.md',
          '/zh/reference/plugin-api.md',
          '/zh/reference/theme-api.md',
          '/zh/reference/client-api.md',
          '/zh/reference/node-api.md',
        ],
      },
      {
        text: '打包工具',
        children: [
          '/zh/reference/bundler/webpack.md',
          '/zh/reference/bundler/vite.md',
        ],
      },
      {
        text: '默认主题',
        children: [
          '/zh/reference/default-theme/config.md',
          '/zh/reference/default-theme/frontmatter.md',
          '/zh/reference/default-theme/components.md',
          '/zh/reference/default-theme/markdown.md',
          '/zh/reference/default-theme/styles.md',
        ],
      },
      {
        text: '官方插件',
        link: '/zh/reference/plugin/',
        children: [],
      },
    ],
  },
  {
    text: '了解更多',
    children: [
      {
        text: '其他资源',
        children: [
          '/zh/contributing.md',
          {
            text: '更新日志',
            link:
              'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md',
          },
          {
            text: 'Awesome VuePress',
            link: 'https://github.com/vuepress/awesome-vuepress',
          },
        ],
      },
      {
        text: '旧版本',
        children: [
          {
            text: 'v1 文档',
            link: 'https://v1.vuepress.vuejs.org/zh/',
          },
          {
            text: 'v0 文档',
            link: 'https://v0.vuepress.vuejs.org/zh/',
          },
        ],
      },
    ],
  },
]
