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
          '/getting-started',
          '/markdown',
          '/assets',
          '/using-vue',
          '/config',
          '/default-theme'
        ]
      },
      {
        title: 'API Reference',
        children: [
          ['/markdown#emoji', 'MMMMM'],
          '/theming',
          '/deploy'
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
