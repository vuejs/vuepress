module.exports = [
  {
    text: 'Guide',
    link: '/guide/',
  },
  {
    text: 'Config Reference',
    link: '/config/'
  },
  {
    text: 'Advanced',
    items: [
      {
        text: 'Plugin',
        items: [
          {
            text: 'Write a plugin',
            link: '/plugin/#writing-a-plugin'
          },
          {
            text: 'Using a plugin',
            link: '/plugin/#using-a-plugin'
          },
          {
            text: 'Options',
            link: '/plugin/#options'
          },
          {
            text: 'Official Plugins',
            link: '/plugin/official.html'
          }
        ]
      },
      {
        text: 'Theme',
        items: [
          {
            text: 'Write a theme',
            link: '/theme/#writing-a-theme'
          },
          {
            text: 'Using a theme',
            link: '/theme/#using-a-theme'
          },
          {
            text: 'Options',
            link: '/theme/#options'
          },
          {
            text: 'Default Theme Config',
            link: '/theme/default-theme-config.html'
          }
        ]
      },
      {
        text: 'Miscellaneous',
        items: [
          {
            text: 'Design Concepts',
            link: '/miscellaneous/design-concepts.html'
          },
          {
            text: 'Migrate from 0.x.x',
            link: '/miscellaneous/migration-guide.html'
          }
        ]
      },
    ],
  },
  {
    text: 'FAQ',
    link: '/faq/',
  },
  {
    text: 'Changelog',
    link: 'https://github.com/vuejs/vuepress/blob/master/CHANGELOG.md'
  }
]
