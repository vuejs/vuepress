module.exports = [
  {
    name: 'title',
    type: 'input',
    message: 'Title',
    description: 'Title for the site.',
    link: 'https://vuepress.vuejs.org/config/#title',
    group: 'General settings',
    validate: input => !!input
  },
  {
    name: 'description',
    type: 'input',
    message: 'Description',
    description: 'Description for the site.',
    link: 'https://vuepress.vuejs.org/config/#description',
    group: 'General settings',
    validate: input => !!input
  }
]
