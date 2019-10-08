const onRead = require('./onRead')
const onWrite = require('./onWrite')

const ID = 'org.vuepress.config'

module.exports = api => {
  api.describeConfig({
    id: ID,
    name: 'VuePress',
    description: 'VuePress configuration',
    link: 'https://vuepress.vuejs.org',
    files: {
      config: {
        js: ['docs/.vuepress/config.js']
      }
    },
    onRead,
    onWrite
  })
}
