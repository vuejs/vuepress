const base = process.env.GH ? '/vuepress/' : '/'

const langs = [
  { text: 'English', link: '/' },
  { text: '简体中文', link: '/zh/' },
]

module.exports = {
  title: 'VuePress',
  description: 'Vue-powered Static Site Generator',
  dest: 'vuepress',
  base,
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  serviceWorker: true,
  themeConfig: {
    repo: 'vuejs/vuepress',
    editLinks: true,
    docsDir: 'docs',
    nav: {
      default: [
        {
          text: 'Guide',
          link: '/guide/',
        },
        {
          text: 'Config Reference',
          link: '/config/'
        },
        {
          text: 'Default Theme Config',
          link: '/default-theme-config/'
        },
        {
          text: 'Languages', type: 'dropdown', items: langs
        }
      ],
      zh: [
        {
          text: '指南',
          link: '/zh/guide/',
        },
        {
          text: '配置',
          link: '/zh/config/'
        },
        {
          text: '默认主题配置',
          link: '/default-theme-config/'
        },
        {
          text: '选择语言', type: 'dropdown', items: langs
        }
      ]
    },
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'getting-started',
            'basic-config',
            'assets',
            'markdown',
            'using-vue',
            'custom-themes',
            'deploy'
          ]
        }
      ],
      '/zh/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            '',
            'getting-started',
            'basic-config',
            'assets',
            'markdown',
            'using-vue',
            'custom-themes',
            'deploy'
          ]
        }
      ]
    }
  }
}
