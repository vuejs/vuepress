const onRead = require('./config/read')
const onWrite = require('./config/write')
const { describeTasks } = require('./tasks')

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
    onRead: onRead(api),
    onWrite: onWrite(api)
  })

  describeTasks(api)
}
