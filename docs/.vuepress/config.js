const path = require('path')
const base = process.env.GH ? '/vuepress/' : '/'
const { extractHeaders } = require('../../lib')

module.exports = {
  title: 'VuePress',
  description: 'Minimalistic docs generator with Vue component based layout system',
  dest: 'vuepress',
  base,
  head: [
    ['link', { rel: 'icon', href: `${base}logo.png` }]
  ],
  themeConfig: {
    logo: `${base}logo.png`,
    repo: 'vuejs/vuepress',
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Config Reference',
        link: '/config/'
      }
    ],
    sidebar: {
      '/guide': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '/guide/',
            '/guide/markdown',
            '/guide/assets',
            '/guide/using-vue',
            '/guide/default-theme',
            '/guide/custom-themes',
            '/guide/deploy'
          ]
        }
      ],
      '/config': [
        {
          title: 'Config Reference',
          collapsable: false,
          children: extractHeaders(
            path.resolve(__dirname, '../config/README.md'),
            ['h3']
          ).map(({ title, slug }) => [`/config/#${slug}`, title])
        }
      ]
    }
  }
}
