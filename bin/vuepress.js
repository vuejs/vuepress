const path = require('path')
const { build } = require('../lib')

build(path.resolve(__dirname, '../docs')).catch(err => {
  console.log(err)
})
