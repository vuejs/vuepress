import type { WebpackDevServer } from '@vuepress/bundler-webpack'
import { createVuepressApp } from './app'

const main = async (): Promise<void> => {
  process.env.NODE_ENV = 'development'

  const app = createVuepressApp()

  await app.dev<WebpackDevServer>()
}

main()
