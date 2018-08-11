#!/usr/bin/env node

require('@vuepress/cli').bootstrap({
  theme: 'default',
  plugins: [
    'test',
    'i18n-ui'
  ]
})
