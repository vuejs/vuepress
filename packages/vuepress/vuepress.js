#!/usr/bin/env node

require('@vuepress/cli').bootstrap({
  theme: 'default',
  plugins: [
    '@vuepress/test',
    '@vuepress/i18n-ui'
  ]
})
