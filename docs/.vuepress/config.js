const base = process.env.GH ? '/vuepress/' : '/'

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
