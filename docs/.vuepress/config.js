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
    // sidebar config
    sidebar: [
      {
        title: 'Guide',
        children: [
          ['/', 'Intro'],
          '/getting-started',
          '/markdown',
          '/assets',
          '/using-vue',
          '/default-theme',
          '/theming',
          '/deploy'
        ]
      },
      {
        title: 'Config Reference',
        children: [
          '/config',
          '/test/'
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
