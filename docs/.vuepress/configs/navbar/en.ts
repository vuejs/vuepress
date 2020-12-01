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
        text: 'Config',
        link: '/reference/config.html',
      },
      {
        text: 'Frontmatter',
        link: '/reference/frontmatter.html',
      },
      {
        text: 'Default Theme',
        link: '/reference/default-theme.html',
      },
    ],
  },
  {
    text: 'Learn More',
    children: [
      '/contributing.md',
      {
        text: 'Changelog',
        link:
          'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md',
      },
    ],
  },
]
