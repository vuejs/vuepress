import type { NavbarConfig } from '@vuepress/theme-default'

export const en: NavbarConfig = [
  {
    text: 'Guide',
    link: '/guide/',
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
          {
            text: 'Config',
            link: '/reference/config.html',
          },
          {
            text: 'Frontmatter',
            link: '/reference/frontmatter.html',
          },
          {
            text: 'Built-in Components',
            link: '/reference/components.html',
          },
          {
            text: 'Plugin API',
            link: '/reference/plugin-api.html',
          },
        ],
      },
      {
        text: 'Default Theme',
        children: [
          {
            text: 'Config',
            link: '/reference/default-theme/config.html',
          },
          {
            text: 'Frontmatter',
            link: '/reference/default-theme/frontmatter.html',
          },
          {
            text: 'Built-in Components',
            link: '/reference/default-theme/components.html',
          },
        ],
      },
    ],
  },
  {
    text: 'Learn More',
    children: [
      {
        text: 'Advanced',
        children: ['/advanced/markdown.md'],
      },
      {
        text: 'Developer',
        children: ['/contributing.md'],
      },
      {
        text: 'Resources',
        children: [
          {
            text: 'Changelog',
            link:
              'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md',
          },
          {
            text: 'Awesome VuePress',
            link: 'https://github.com/vuepress/awesome-vuepress',
          },
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
