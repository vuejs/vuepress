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
        '/guide/page.md',
        '/guide/markdown.md',
        '/guide/assets.md',
        '/guide/i18n.md',
        '/guide/deployment.md',
      ],
    },
  ],
  '/reference/': [
    {
      isGroup: true,
      text: 'Reference',
      children: [
        '/reference/cli.md',
        '/reference/config.md',
        '/reference/frontmatter.md',
        '/reference/default-theme.md',
      ],
    },
  ],
}
