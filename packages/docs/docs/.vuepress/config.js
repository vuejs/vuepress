const path = require('path')

module.exports = {
  dest: '../../vuepress',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      lang: 'zh-CN',
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
  themeConfig: {
    repo: 'vuejs/vuepress',
    editLinks: true,
    docsDir: 'docs',
    // #697 Provided by the official algolia team.
    // algolia: {
    //   apiKey: '3a539aab83105f01761a137c61004d85',
    //   indexName: 'vuepress'
    // },
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          '/guide/': getGuideSidebar('Guide', 'Advanced'),
          '/plugin/': getPluginSidebar('Plugin', 'Introduction'),
          '/theme/': getThemeSidebar('Theme', 'Introduction'),
        }
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh'),
        sidebar: {
          '/zh/guide/': getGuideSidebar('指南', '深入'),
          '/zh/plugin/': getPluginSidebar('插件', '介绍'),
          '/zh/theme/': getThemeSidebar('主题', '介绍')
        }
      }
    }
  },
  plugins: {
    '@vuepress/i18n-ui': true,
    '@vuepress/back-to-top': true,
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true
    },
    '@vuepress/plugin-medium-zoom': true,
    '@vuepress/notification': true,
    'flowchart': true,
    '@vuepress/google-analytics': {
      ga: 'UA-128189152-1'
    }
  },
  clientRootMixin: path.resolve(__dirname, 'mixin.js')
}

function getGuideSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'directory-structure',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'i18n',
        'deploy',
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'permalinks',
        'markdown-slot'
      ]
    }
  ]
}

function getPluginSidebar (groupA, introductionA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        ['', introductionA],
        'using-a-plugin',
        'writing-a-plugin',
        'life-cycle',
        'option-api',
        'context-api',
        'official'
      ]
    },
  ]
}

function getThemeSidebar (groupA, introductionA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        ['', introductionA],
        'using-a-theme',
        'writing-a-theme',
        'option-api',
        'default-theme-config'
      ]
    },
  ]
}
