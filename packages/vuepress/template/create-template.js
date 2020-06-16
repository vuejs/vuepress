const templateDirectory = 'vuepress/template'

module.exports = [
  {
    path: `${templateDirectory}/config-template.js`,
    destination: '.vuepress/config.js',
    message: 'Successfully created config file'
  },
  {
    path: `${templateDirectory}/index-template.md`,
    destination: 'index.md',
    message: 'Successfully created home page'
  },
  {
    path: `${templateDirectory}/basic-template.md`,
    destination: 'basic.md',
    message: 'Successfully created basic page'
  },
  {
    path: `${templateDirectory}/section-index-template.md`,
    destination: 'section/index.md',
    message: 'Successfully created section page'
  },
  {
    path: `${templateDirectory}/vuepress-logo-template.png`,
    destination: '.vuepress/public/vuepress-logo.png',
    message: 'Successfully created VuePress logo image'
  }
]
