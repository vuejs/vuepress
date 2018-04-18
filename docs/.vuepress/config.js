module.exports = {
  dest: 'vuepress',
  locales: {
    '/': {
      lang: 'en-US',
      label: 'English',
      selectText: 'Languages',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      lang: 'zh-CN',
      label: '简体中文',
      selectText: '选择语言',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
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
    },
    editLinkText: {
      '/zh/': '在 GitHub 上编辑此页'
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
        'i18n',
        'deploy'
      ]
    }
  ]
}
