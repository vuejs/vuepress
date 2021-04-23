import type { NavbarConfig } from '@vuepress/theme-default'

export const en: NavbarConfig = [
  {
    text: 'Guide',
    link: '/guide/',
  },
  {
    text: 'Advanced',
    children: [
      '/advanced/architecture.md',
      '/advanced/plugin.md',
      '/advanced/theme.md',
      {
        text: 'Cookbook',
        link: '/advanced/cookbook/',
      },
    ],
  },
  {
    text: 'Reference',
    children: [
      {
        text: 'VuePress',
        children: [
          {
            text: 'CLI',
            link: '/reference/cli.html',
          },
          '/reference/config.md',
          '/reference/frontmatter.md',
          '/reference/components.md',
          '/reference/plugin-api.md',
          '/reference/theme-api.md',
          '/reference/client-api.md',
          '/reference/node-api.md',
        ],
      },
      {
        text: 'Bundlers',
        children: [
          '/reference/bundler/webpack.md',
          '/reference/bundler/vite.md',
        ],
      },
      {
        text: 'Default Theme',
        children: [
          '/reference/default-theme/config.md',
          '/reference/default-theme/frontmatter.md',
          '/reference/default-theme/components.md',
          '/reference/default-theme/markdown.md',
          '/reference/default-theme/styles.md',
        ],
      },
      {
        text: 'Official Plugins',
        link: '/reference/plugin/',
        children: [],
      },
    ],
  },
  {
    text: 'Learn More',
    children: [
      {
        text: 'Resources',
        children: [
          '/contributing.md',
          {
            text: 'Changelog',
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
        text: 'Legacy Version',
        children: [
          {
            text: 'v1 docs',
            link: 'https://v1.vuepress.vuejs.org',
          },
          {
            text: 'v0 docs',
            link: 'https://v0.vuepress.vuejs.org',
          },
        ],
      },
    ],
  },
]
