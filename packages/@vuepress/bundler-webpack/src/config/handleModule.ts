import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'
import type { BundlerWebpackOptions } from '../types'
import { handleModuleAssets } from './handleModuleAssets'
import { handleModuleJs } from './handleModuleJs'
import { handleModulePug } from './handleModulePug'
import { handleModuleStyles } from './handleModuleStyles'
import { handleModuleTs } from './handleModuleTs'
import { handleModuleVue } from './handleModuleVue'

/**
 * Set webpack module
 */
export const handleModule = ({
  app,
  options,
  config,
  isServer,
  isBuild,
}: {
  app: App
  options: BundlerWebpackOptions
  config: Config
  isBuild: boolean
  isServer: boolean
}): void => {
  // noParse
  config.module.noParse(
    /(^(vue|vue-router|vuex|vuex-router-sync)$)|(^@vue\/[^/]*$)/
  )

  // vue files
  handleModuleVue({ app, config, isServer })

  // pug files, for templates
  handleModulePug({ config })

  // images & media & fonts
  handleModuleAssets({ app, config })

  // js files
  handleModuleJs({ app, config, isServer })

  // ts files
  handleModuleTs({ app, config })

  // styles files
  handleModuleStyles({ app, options, config, isServer, isBuild })
}
