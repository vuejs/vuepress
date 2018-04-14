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
      },
      {
        text: 'Links',
        items: [
          {
            text: 'Vue',
            link: 'https://vuejs.org/',
          },
          {
            text: 'Vue-Router',
            link: 'https://router.vuejs.org/en/',
          },
          {
            text: 'Vue-CLI',
            link: 'https://github.com/vuejs/vue-cli/blob/dev/docs/README.md',
          },
          {
            text: 'Vue-Press',
            link: '/',
          },
        ]
      },
      {
        text: 'Ecosystem',
        items: [
          {
            text: 'Help',
            items: [
              {
                text: 'Forum',
                link: 'https://forum.vuejs.org/'
              },
              {
                text: 'Chat',
                link: 'https://chat.vuejs.org/'
              }
            ]
          },
          {
            text: 'Tooling',
            items: [
              {
                text: 'Devtools',
                link: 'https://github.com/vuejs/vue-devtools'
              },
              {
                text: 'Webpack Template',
                link: 'https://vuejs-templates.github.io/webpack'
              },
              {
                text: 'Vue Loader',
                link: 'https://vue-loader.vuejs.org'
              }
            ]
          },
          {
            text: 'News',
            items: [
              {
                text: 'Weekly News',
                link: 'https://news.vuejs.org'
              },
              {
                text: 'Roadmap',
                link: 'https://github.com/vuejs/roadmap'
              },
              {
                text: 'Twitter',
                link: 'https://twitter.com/vuejs'
              },
              {
                text: 'Blog',
                link: 'https://medium.com/the-vue-point'
              },
              {
                text: 'Jobs',
                link: 'https://vuejobs.com/?ref=vuejs'
              }
            ]
          },
          {
            text: 'Resource Lists',
            items: [
              {
                text: 'Vue Curated',
                link: 'ttps://curated.vuejs.org/'
              },
              {
                text: 'Awesome Vue',
                link: 'https://github.com/vuejs/awesome-vue'
              }
            ]
          }
        ]
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
