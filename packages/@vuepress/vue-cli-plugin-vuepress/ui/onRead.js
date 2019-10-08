module.exports = ({ data }) => ({
  prompts: [
    {
      name: 'title',
      type: 'input',
      message: 'Title',
      value: data.config.title
    },
    {
      name: 'description',
      type: 'input',
      message: 'Description',
      value: data.config.description
    }
  ]
})
