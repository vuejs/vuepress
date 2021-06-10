import type { BuildApp, AppConfig } from '../types'
import { createBaseApp } from './createBaseApp'
import { resolveBundler } from './resolveBundler'

/**
 * Create vuepress build app
 */
export const createBuildApp = (config: AppConfig): BuildApp => {
  const app = createBaseApp(config, true) as BuildApp
  app.build = () => resolveBundler(app.options).build(app)
  return app
}
