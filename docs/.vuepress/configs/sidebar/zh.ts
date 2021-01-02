import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/zh/guide/': [
    {
      isGroup: true,
      text: '指南',
      children: [
        '/zh/guide/README.md',
        '/zh/guide/getting-started.md',
        '/zh/guide/configuration.md',
        '/zh/guide/page.md',
        '/zh/guide/markdown.md',
        '/zh/guide/assets.md',
        '/zh/guide/i18n.md',
        '/zh/guide/theme.md',
        '/zh/guide/plugin.md',
        '/zh/guide/deployment.md',
      ],
    },
  ],
  '/zh/reference/': [
    {
      isGroup: true,
      text: 'VuePress 参考',
      children: [
        '/zh/reference/cli.md',
        '/zh/reference/config.md',
        '/zh/reference/frontmatter.md',
        '/zh/reference/components.md',
        '/zh/reference/plugin-api.md',
      ],
    },
  ],
  '/zh/reference/default-theme/': [
    {
      isGroup: true,
      text: '默认主题参考',
      children: [
        '/zh/reference/default-theme/config.md',
        '/zh/reference/default-theme/frontmatter.md',
        '/zh/reference/default-theme/components.md',
      ],
    },
  ],
  '/zh/advanced/': [
    {
      isGroup: true,
      text: '深入',
      children: ['/zh/advanced/markdown.md'],
    },
  ],
}
