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

  const tasks = [
    {
      match: /dev/,
      description: 'Run VuePress in dev mode',
      link: 'https://vuepress.vuejs.org/guide/getting-started.html#inside-an-existing-project'
    },
    {
      match: /build/,
      description: 'Build static VuePress website',
      link: 'https://vuepress.vuejs.org/guide/getting-started.html#inside-an-existing-project'
    }
  ]

  tasks.forEach(task => {
    api.describeTask(task)
  })
}
