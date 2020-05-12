import * as Config from 'webpack-chain'
import { App } from '@vuepress/core'
import { handleModuleAssets } from './handleModuleAssets'
import { handleModulePug } from './handleModulePug'
import { handleModuleVue } from './handleModuleVue'

/**
 * Set webpack module
 */
export const handleModule = (config: Config, app: App): void => {
  // noParse
  config.module.noParse(
    /(^(vue|vue-router|vuex|vuex-router-sync)$)|(^@vue\/[^/]*$)/
  )

  // vue & markdown files
  handleModuleVue(config, app)

  // pug files, for templates
  handleModulePug(config)

  // images & media & fonts
  handleModuleAssets(config)

  // TODO: scripts, evergreen, babel, ts
  // TODO: styles
}
