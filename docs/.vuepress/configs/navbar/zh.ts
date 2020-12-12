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
        text: '默认主题',
        link: '/zh/reference/default-theme.html',
      },
    ],
  },
  {
    text: '了解更多',
    children: [
      '/zh/contributing.md',
      {
        text: '更新日志',
        link:
          'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md',
      },
    ],
  },
]
