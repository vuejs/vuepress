import type { SidebarConfig } from '@vuepress/theme-default'

export const en: SidebarConfig = {
  '/guide/': [
    {
      isGroup: true,
      text: 'Guide',
      children: [
        '/guide/README.md',
        '/guide/getting-started.md',
        '/guide/configuration.md',
      ],
    },
  ],
  '/reference/': [
    {
      isGroup: true,
      text: 'Reference',
      children: [
        '/reference/config.md',
        '/reference/frontmatter.md',
        '/reference/default-theme.md',
      ],
    },
  ],
}
