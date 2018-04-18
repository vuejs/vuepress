module.exports = {
  dest: 'vuepress',
  langs: [
    { lang: 'en', label: 'English', path: '/', selectText: 'Languages' },
    { lang: 'zh-CN', label: '简体中文', path: '/zh/', selectText: '选择语言' }
  ],
  title: {
    '/': 'VuePress',
    '/zh/': 'VuePress'
  },
  description: {
    '/': 'Vue-powered Static Site Generator',
    '/zh/': 'Vue 驱动的静态网站生成器'
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  serviceWorker: true,
  themeConfig: {
    repo: 'vuejs/vuepress',
    editLinks: true,
    docsDir: 'docs',
    nav: {
      '/': [
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
        }
      ],
      '/zh/': [
        {
          text: '指南',
          link: '/zh/guide/',
        },
        {
          text: '配置',
          link: '/zh/config/'
        },
        {
          text: '默认主题',
          link: '/zh/default-theme-config/'
        }
      ]
    },
    sidebar: {
      '/guide/': genSidebarConfig('Guide'),
      '/zh/guide/': genSidebarConfig('指南')
    }
  }
}

function genSidebarConfig (title) {
  return [
    {
      title,
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
