import type { DevApp, AppConfig } from '../types'
import { createBaseApp } from './createBaseApp'
import { resolveBundler } from './resolveBundler'

/**
 * Create vuepress dev app
 */
export const createDevApp = (config: AppConfig): DevApp => {
  const app = createBaseApp(config, false) as DevApp
  app.dev = () => resolveBundler(app.options).dev(app)
  return app
}
