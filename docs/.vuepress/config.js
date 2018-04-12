const fs = require('fs')
const path = require('path')
const base = process.env.GH ? '/vuepress/' : '/'
const { extractHeaders } = require('../../lib')

module.exports = {
  title: 'VuePress',
  description: 'Vue-powered Static Site Generator',
  dest: 'vuepress',
  base,
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  themeConfig: {
    repo: 'vuejs/vuepress',
    editLinks: true,
    docsDir: 'docs',
    nav: [
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
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'getting-started',
            'markdown',
            'assets',
            'using-vue',
            'custom-themes',
            'deploy'
          ]
        }
      ],
      '/config/': [
        {
          title: 'Config Reference',
          collapsable: false,
          children: genSidebar('config/README.md')
        }
      ],
      '/default-theme-config/': [
        {
          title: 'Default Theme Config',
          collapsable: false,
          children: genSidebar('default-theme-config/README.md')
        }
      ]
    }
  }
}

function genSidebar (file) {
  return extractHeaders(
    fs.readFileSync(path.resolve(__dirname, '../', file), 'utf-8'),
    ['h3']
  ).map(({ title, slug }) => [`#${slug}`, title])
}
