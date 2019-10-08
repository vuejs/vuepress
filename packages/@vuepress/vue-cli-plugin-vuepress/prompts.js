module.exports = [
  {
    type: 'input',
    name: 'title',
    message: 'Title',
    validate: input => !!input
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description',
    validate: input => !!input
  }
]
