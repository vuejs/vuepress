import { AppBundler } from '@vuepress/core'
import { build } from './build'
import { dev } from './dev'

const webpackBundler: AppBundler = {
  dev,
  build,
}

export = webpackBundler
