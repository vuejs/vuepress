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

  api.describeTask({
    match: /dev/,
    description: 'Run VuePress in dev mode',
    link: 'https://vuepress.vuejs.org/guide/getting-started.html#inside-an-existing-project'
  })

  api.describeTask({
    match: /build/,
    description: 'Build static VuePress website',
    link: 'https://vuepress.vuejs.org/guide/getting-started.html#inside-an-existing-project'
  })
}
