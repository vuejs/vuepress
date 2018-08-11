#!/usr/bin/env node

require('@vuepress/cli').bootstrap({
  theme: 'default',
  plugins: [
    'test',
    'translation-ui'
  ]
})
