#!/usr/bin/env node

const { cli } = require('@vuepress/cli')

// set default bundler
cli({ bundler: '@vuepress/bundler-vite' })
