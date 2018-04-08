const base = process.env.GH ? '/vuepress/' : '/'

module.exports = {
  title: 'VuePress',
  description: 'Minimalistic docs generator with Vue component based layout system',
  dest: 'vuepress',
  base,
  head: [
    ['link', { rel: 'icon', href: `${base}logo.png` }]
  ],
  themeConfig: {
    sidebar: [
      '/',
      '/markdown',
      '/assets',
      '/using-vue',
      '/config',
      '/default-theme',
      '/theming',
      '/deploy'
    ]
  }
}
