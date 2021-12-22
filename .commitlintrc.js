const fs = require('fs')
const path = require('path')

const vuepressPackages = fs.readdirSync(path.resolve(__dirname, 'packages/@vuepress'))
const availableScopes = [
  'all',
  'cli',
  'zh',
  'types',
  ...vuepressPackages
]

module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        ...availableScopes,
        ...availableScopes.map(name => `$${name}`)
      ]
    ]
  }
}
