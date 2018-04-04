module.exports = async function build (sourceDir) {
  process.env.NODE_ENV = 'production'

  const prepare = require('./prepare')
  const path = require('path')
  const webpack = require('webpack')
  const { promisify } = require('util')
  const rimraf = promisify(require('rimraf'))
  const createClientConfig = require('./webpack/clientConfig')
  const createServerConfig = require('./webpack/serverConfig')

  const options = await prepare(sourceDir)

  const targetDir = path.resolve(sourceDir, '_dist')
  await rimraf(targetDir)

  const clientConfig = createClientConfig(options).toConfig()
  const serverConfig = createServerConfig(options).toConfig()

  await Promise.all([
    compile(clientConfig),
    compile(serverConfig)
  ])

  function compile (config) {
    return new Promise((resolve, reject) => {
      webpack(config, (err, stats) => {
        if (err) {
          return reject(err)
        }
        if (stats.hasErrors()) {
          reject(`Failed to compile with errors.`)
          stats.toJson().errors.forEach(err => {
            console.error(err)
          })
          return
        }
        resolve()
      })
    })
  }
}
