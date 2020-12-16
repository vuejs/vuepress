const fs = require('fs')
const path = require('path')

const packages = fs.readdirSync(path.resolve(__dirname, 'packages/@vuepress'))

module.exports = {
  settings: {
    'vetur.validation.template': false,
    'vetur.useWorkspaceDependencies': true,
  },
  projects: [
    './docs',
    './packages/vuepress',
    ...packages.map((item) => `./packages/@vuepress/${item}`),
  ],
}
