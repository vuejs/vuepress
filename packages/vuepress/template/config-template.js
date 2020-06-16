module.exports = {
  title: 'VuePress Starter Kit',
  description: 'This is your page description.',
  themeConfig: {
    // logo: '/vuepress-logo.png',
    // lastUpdated: 'Last updated',
    // repo: 'https://github.com/bencodezen/vuepress-starter-kit',
    // docsDir: 'docs',
    // editLinks: true,
    // editLinkText: 'Recommend a change',
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Basic Page',
        link: '/basic/'
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
      },
      {
        text: 'Contact',
        items: [
          {
            text: 'Twitter',
            link: 'https://www.twitter.com/'
          },
          {
            text: 'Email',
            link: 'mailto:hello@email.com'
          }
        ]
      },
      {
        text: 'Component Example',
        link: '/component-example'
      }
    ],
    plugins: ['@vuepress/active-header-links']
  }
}
