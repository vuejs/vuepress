import type { NavbarConfig } from '@vuepress/theme-default'

export const zh: NavbarConfig = [
  {
    text: '指南',
    link: '/zh/guide/',
  },
  {
    text: '参考',
    children: [
      {
        text: 'VuePress',
        children: [
          {
            text: '命令行接口',
            link: '/zh/reference/cli.html',
          },
          {
            text: '配置',
            link: '/zh/reference/config.html',
          },
          {
            text: 'Frontmatter',
            link: '/zh/reference/frontmatter.html',
          },
          {
            text: '内置组件',
            link: '/zh/reference/components.html',
          },
          {
            text: '插件 API',
            link: '/zh/reference/plugin-api.html',
          },
        ],
      },
      {
        text: '默认主题',
        children: [
          {
            text: '配置',
            link: '/zh/reference/default-theme/config.html',
          },
          {
            text: 'Frontmatter',
            link: '/zh/reference/default-theme/frontmatter.html',
          },
          {
            text: '内置组件',
            link: '/zh/reference/default-theme/components.html',
          },
        ],
      },
    ],
  },
  {
    text: '了解更多',
    children: [
      {
        text: '深入',
        children: ['/zh/advanced/markdown.md'],
      },
      {
        text: '开发者',
        children: ['/zh/contributing.md'],
      },
      {
        text: '其他资源',
        children: [
          {
            text: '更新日志',
            link:
              'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md',
          },
          {
            text: 'Awesome VuePress',
            link: 'https://github.com/vuepress/awesome-vuepress',
          },
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
