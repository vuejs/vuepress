const base = process.env.GH ? '/vuepress/' : '/'

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
        children: [
          '/config#base',
          '/config#title',
          '/config#description',
          '/config#head',
          '/config#port',
          '/config#dest',
          '/config#theme',
          '/config#themeConfig',
          '/config#markdownanchor',
          '/config#markdowntoc',
          '/config#markdownconfig',
          '/config#configureWebpack',
          '/config#chainWebpack',
          '/config#evergreen'
        ]
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
