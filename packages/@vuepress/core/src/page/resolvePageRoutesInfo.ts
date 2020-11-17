import { path } from '@vuepress/utils'
import type { App } from '../types'

/**
 * Resolve page routes file path
 */
export const resolvePageRoutesInfo = ({
  app,
  key,
}: {
  app: App
  key: string
}): {
  routesFilePath: string
  routesFilePathRelative: string
} => {
  const routesFilePathRelative = path.join(`internal/pageRoutes/${key}.js`)
  const routesFilePath = app.dir.temp(routesFilePathRelative)

  return {
    routesFilePath,
    routesFilePathRelative,
  }
}
