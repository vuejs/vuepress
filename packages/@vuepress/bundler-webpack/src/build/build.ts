import * as webpack from 'webpack'
import { App } from '@vuepress/core'
import { fs } from '@vuepress/utils'
import { createClientConfig, createServerConfig } from '../config'

export const build = async (app: App): Promise<void> => {
  // initialize app
  await app.init()

  // create webpack config
  const clientConfig = createClientConfig(app).toConfig()
  const serverConfig = createServerConfig(app).toConfig()

  // prepare app
  await app.prepare()

  // empty dest directory
  await fs.emptyDir(app.dir.dest())

  // TODO

  await new Promise((resolve, reject) => {
    webpack([clientConfig, serverConfig], (err, stats) => {
      if (err) {
        reject(err)
      } else if (stats.hasErrors()) {
        stats.toJson().errors.forEach((err) => {
          console.error(err)
        })
        reject(new Error('Failed to compile with errors'))
      } else {
        if (stats.hasWarnings()) {
          stats.toJson().warnings.forEach((warning) => {
            console.warn(warning)
          })
        }

        resolve()
      }
    })
  })
}
