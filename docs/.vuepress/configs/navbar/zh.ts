import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta'

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
    ],
  },
  {
    text: '插件',
    children: [
      {
        text: '常用功能',
        children: [
          '/zh/reference/plugin/back-to-top.md',
          '/zh/reference/plugin/container.md',
          '/zh/reference/plugin/docsearch.md',
          '/zh/reference/plugin/google-analytics.md',
          '/zh/reference/plugin/medium-zoom.md',
          '/zh/reference/plugin/nprogress.md',
          '/zh/reference/plugin/pwa.md',
          '/zh/reference/plugin/pwa-popup.md',
          '/zh/reference/plugin/register-components.md',
          '/zh/reference/plugin/search.md',
        ],
      },
      {
        text: '语法高亮',
        children: [
          '/zh/reference/plugin/prismjs.md',
          '/zh/reference/plugin/shiki.md',
        ],
      },
      {
        text: '主题开发',
        children: [
          '/zh/reference/plugin/active-header-links.md',
          '/zh/reference/plugin/debug.md',
          '/zh/reference/plugin/git.md',
          '/zh/reference/plugin/palette.md',
          '/zh/reference/plugin/theme-data.md',
          '/zh/reference/plugin/toc.md',
        ],
      },
    ],
  },
  {
    text: '了解更多',
    children: [
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
        text: '其他资源',
        children: [
          '/zh/contributing.md',
          {
            text: 'Awesome VuePress',
            link: 'https://github.com/vuepress/awesome-vuepress',
          },
        ],
      },
    ],
  },
  {
    text: `v${version}`,
    children: [
      {
        text: '更新日志',
        link:
          'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md',
      },
      {
        text: 'v1.x',
        link: 'https://v1.vuepress.vuejs.org/zh/',
      },
      {
        text: 'v0.x',
        link: 'https://v0.vuepress.vuejs.org/zh/',
      },
    ],
  },
]
