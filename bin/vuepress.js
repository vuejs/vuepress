const path = require('path')
const { serve, build } = require('../lib')

const sourceDir = path.resolve(__dirname, '../docs')

serve(sourceDir).catch(err => {
  console.error(err)
})

// build(sourceDir).catch(err => {
//   console.log(err)
// })
