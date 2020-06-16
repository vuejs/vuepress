module.exports = {
  title: 'VuePress Site Title',
  description: 'This is your landing page description.',
  themeConfig: {
    logo: '/vuepress-logo.png',
    lastUpdated: 'Last updated',
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Basic Page',
        link: '/basic'
      },
      {
        text: 'Section',
        items: [
          {
            text: 'Section Introduction',
            link: '/section/#section-introduction'
          },
          {
            text: 'Some More Content!',
            link: '/section/#some-more-content'
          }
        ]
      }
    ],
    plugins: ['@vuepress/active-header-links']
  }
}
