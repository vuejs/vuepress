function describeTasks (api) {
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

module.exports = {
  describeTasks
}
