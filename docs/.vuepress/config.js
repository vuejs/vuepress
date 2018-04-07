module.exports = {
  title: 'VuePress',
  dest: 'vuepress',
  description: 'Minimalistic docs generator with Vue component based layout system',
}

// set base URL if building for github
if (process.env.GH) {
  Object.assign(module.exports, {
    base: '/vuepress/'
  })
}
