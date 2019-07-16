module.exports = {
  title: 'Hello VuePress',
  description: '# Hello, VuePress!',
  dest: 'vuepress',
  base: 'vuepress',
  patterns: ['**/*.md', '**/*.vue', '!**/deploy.*'],
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ]
}
