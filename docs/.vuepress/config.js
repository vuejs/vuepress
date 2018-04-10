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
    github: 'vuejs/vuepress',
    // sidebar config
    sidebar: [
      {
        title: 'Guide',
        collapsable: false,
        children: [
          '/',
          '/getting-started',
          '/markdown',
          '/assets',
          '/using-vue',
          '/default-theme',
          '/custom-themes',
          '/deploy'
        ]
      },
      {
        title: 'Config Reference',
        children: extractHeaders(
          path.resolve(__dirname, '../config.md'),
          ['h3']
        ).map(({ title, slug }) => [`/config#${slug}`, title])
      }
    ],

    // multi-category sidebar config

    // sidebar: {
    //   '*': [/* ... */],
    //   '/guide/': [/* ... */],
    //   '/tutorial/': [/* ... */],
    //   '/api/': [/* ... */]
    // },

    // navbar config

    // nav: [
    //   {
    //     title: 'Guide',
    //     link: '/getting-started',
    //   },
    //   // ...
    // ]
  }
}
