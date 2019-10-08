module.exports = ({ data }) => ({
  prompts: [
    {
      name: 'title',
      type: 'input',
      message: 'Title',
      description: 'Title for the site.',
      link: 'https://vuepress.vuejs.org/config/#title',
      group: 'General settings',
      value: data.config.title,
      validate: input => !!input
    },
    {
      name: 'description',
      type: 'input',
      message: 'Description',
      description: 'Description for the site.',
      link: 'https://vuepress.vuejs.org/config/#description',
      group: 'General settings',
      value: data.config.description,
      validate: input => !!input
    }
  ]
})
