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
        '/guide/theme.md',
        '/guide/plugin.md',
        '/guide/deployment.md',
      ],
    },
  ],
  '/reference/': [
    {
      isGroup: true,
      text: 'VuePress Reference',
      children: [
        '/reference/cli.md',
        '/reference/config.md',
        '/reference/frontmatter.md',
        '/reference/components.md',
        '/reference/plugin-api.md',
      ],
    },
  ],
  '/reference/default-theme/': [
    {
      isGroup: true,
      text: 'Default Theme Reference',
      children: [
        '/reference/default-theme/config.md',
        '/reference/default-theme/frontmatter.md',
        '/reference/default-theme/components.md',
      ],
    },
  ],
  '/advanced/': [
    {
      isGroup: true,
      text: 'Advanced',
      children: ['/advanced/markdown.md'],
    },
  ],
}
