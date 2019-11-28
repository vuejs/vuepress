const fs = require('fs')
const path = require('path')

const VuepressPackages = fs.readdirSync(path.resolve(__dirname, 'packages/@vuepress'))

module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'scope-enum': [
      'cli',
      ...VuepressPackages
    ].map(name => `$${name}`)
  }
}
